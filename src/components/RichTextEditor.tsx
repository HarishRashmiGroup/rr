import React, { useState, useRef, useCallback, useEffect } from 'react';

// Icon components
const BoldIcon = () => <span style={{ fontWeight: 'bold', fontSize: '14px' }}>B</span>;
const ItalicIcon = () => <span style={{ fontStyle: 'italic', fontSize: '14px' }}>I</span>;
const UnderlineIcon = () => <span style={{ textDecoration: 'underline', fontSize: '14px' }}>U</span>;
const StrikethroughIcon = () => <span style={{ textDecoration: 'line-through', fontSize: '14px' }}>S</span>;
const AlignLeftIcon = () => <span>⬅</span>;
const AlignCenterIcon = () => <span>≡</span>;
const AlignRightIcon = () => <span>➡</span>;
const AlignJustifyIcon = () => <span>⬜</span>;
const ListIcon = () => <span>•</span>;
const NumberListIcon = () => <span>1.</span>;
const LinkIcon = () => <span>🔗</span>;
const ImageIcon = () => <span>🖼️</span>;
const UndoIcon = () => <span>↶</span>;
const RedoIcon = () => <span>↷</span>;
const IndentIcon = () => <span>→</span>;
const OutdentIcon = () => <span>←</span>;
const CodeIcon = () => <span>&lt;/&gt;</span>;
const QuoteIcon = () => <span>"</span>;
const TableIcon = () => <span>⊞</span>;
const ClearIcon = () => <span>✖</span>;
const MergeIcon = () => <span>⊡</span>;
const SplitIcon = () => <span>⊟</span>;

interface RichTextEditorProps {
    initialContent?: string;
    placeholder?: string;
    height?: string;
    onChange?: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    initialContent = '',
    placeholder = 'Start typing...',
    height = '400px',
    onChange,
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [fontSize, setFontSize] = useState('3'); // 1-7 scale
    const [fontFamily, setFontFamily] = useState('Arial');
    const [textColor, setTextColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isTableModalOpen, setIsTableModalOpen] = useState(false);

    const [linkUrl, setLinkUrl] = useState('');
    const [linkText, setLinkText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [tableRows, setTableRows] = useState(3);
    const [tableCols, setTableCols] = useState(7);

    const [selectedCells, setSelectedCells] = useState<Set<HTMLTableCellElement>>(new Set());
    const [canMerge, setCanMerge] = useState(false);
    const [canUnmerge, setCanUnmerge] = useState(false);

    // Helper function to convert RGB/RGBA color to Hex
    const rgbToHex = (rgb: string) => {
        if (!rgb || rgb.startsWith('transparent') || rgb === 'none') {
            return '#000000';
        }
        const rgba = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.?\d*))?\)$/);
        if (!rgba) return '#000000';
        const toHex = (c: string) => ('0' + parseInt(c).toString(16)).slice(-2);
        return '#' + toHex(rgba[1]) + toHex(rgba[2]) + toHex(rgba[3]);
    };

    // Function to update toolbar state based on current selection
    const updateToolbarState = useCallback(() => {
        if (editorRef.current) {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                let node = range.commonAncestorContainer;
                // Walk up to an Element if needed
                let element: Element | null = null;
                if (node.nodeType === Node.ELEMENT_NODE) {
                    element = node as Element;
                } else if ((node as ChildNode).parentElement) {
                    element = (node as ChildNode).parentElement;
                }
                // Walk up to an Element if still not one
                while (element && !(element instanceof Element) && (element as any).parentElement) {
                    element = (element as any).parentElement;
                }
                if (element && element instanceof Element) {
                    // Font family
                    const computedFontFamily = window.getComputedStyle(element).fontFamily;
                    setFontFamily(computedFontFamily.replace(/['"]/g, ''));
                    // Font size
                    const computedFontSizePx = window.getComputedStyle(element).fontSize;
                    const pxToExecCommandSizeMap: { [key: string]: string } = {
                        '10px': '1', '13px': '2', '16px': '3', '18px': '4',
                        '24px': '5', '32px': '6', '48px': '7'
                    };
                    setFontSize(pxToExecCommandSizeMap[computedFontSizePx] || '3');
                    // Text color
                    const computedTextColor = window.getComputedStyle(element).color;
                    setTextColor(rgbToHex(computedTextColor));
                    // Background color
                    const computedBackgroundColor = window.getComputedStyle(element).backgroundColor;
                    setBackgroundColor(rgbToHex(computedBackgroundColor));
                }
            } else {
                setFontSize('3');
                setFontFamily('Arial');
                setTextColor('#000000');
                setBackgroundColor('#ffffff');
            }
        }
    }, []);

    // Handle content changes
    const handleContentChange = useCallback(() => {
        if (editorRef.current && onChange) {
            onChange(editorRef.current.innerHTML);
            updateToolbarState(); // Always update toolbar state on content change
        }
    }, [onChange, updateToolbarState]);

    // Execute formatting commands with better error handling
    const executeCommand = useCallback((command: string, value?: string) => {
        try {
            document.execCommand(command, false, value);
            if (editorRef.current) {
                editorRef.current.focus();
                handleContentChange(); // Trigger content change handler to update toolbar state
            }
        } catch (error) {
            console.warn('Command execution failed:', command, error);
        }
    }, [handleContentChange]); // Added handleContentChange to dependencies

    // Check if text is selected
    const getSelectedText = () => {
        const selection = window.getSelection();
        return selection && selection.toString().length > 0 ? selection.toString() : '';
    };

    // Apply formatting only to selected text
    const applyToSelection = (styleProperty: string, value: string) => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0 && selection.toString().length > 0) {
            const range = selection.getRangeAt(0);

            try {
                // Extract the selected content
                const selectedContent = range.extractContents();
                const span = document.createElement('span');
                span.style.setProperty(styleProperty, value);
                span.appendChild(selectedContent);
                range.insertNode(span);

                // Clear selection
                selection.removeAllRanges();
                handleContentChange(); // Update toolbar state after applying style
            } catch (error) {
                // Fallback method for browsers that might not support extractContents well in complex scenarios
                // Or for cases where we want to preserve some existing HTML structure
                const selectedText = selection.toString();
                const styledText = `<span style="${styleProperty}: ${value};">${selectedText}</span>`;
                executeCommand('insertHTML', styledText);
            }
        } else {
            // If no text is selected, apply to the current typing context via execCommand
            if (styleProperty === 'font-family') executeCommand('fontName', value);
            else if (styleProperty === 'font-size') executeCommand('fontSize', value);
            else if (styleProperty === 'color') executeCommand('foreColor', value);
            else if (styleProperty === 'background-color') executeCommand('backColor', value);
            handleContentChange(); // Update toolbar state after applying style
        }
    };

    // Format text commands
    const formatText = (command: string, value?: string) => {
        executeCommand(command, value);
    };

    // Enhanced font family change for selected text only
    const changeFontFamily = (family: string) => {
        const selectedText = getSelectedText();
        if (selectedText) {
            applyToSelection('font-family', family);
        } else {
            executeCommand('fontName', family);
        }
        setFontFamily(family); // Update state to reflect in dropdown
    };

    // Enhanced font size change for selected text only
    const changeFontSize = (size: string) => {
        const selectedText = getSelectedText();
        const sizeMap: { [key: string]: string } = {
            '1': '10px', '2': '13px', '3': '16px', '4': '18px',
            '5': '24px', '6': '32px', '7': '48px'
        };
        const pixelSize = sizeMap[size] || '16px';
        if (selectedText) {
            applyToSelection('font-size', pixelSize);
        } else {
            executeCommand('fontSize', size);
        }
        setFontSize(size);
    };

    // Enhanced color change for selected text only
    const changeTextColor = (color: string) => {
        const selectedText = getSelectedText();
        if (selectedText) {
            applyToSelection('color', color);
        } else {
            executeCommand('foreColor', color);
        }
        setTextColor(color); // Update state to reflect in color picker
    };

    // Enhanced background color change for selected text only
    const changeBackgroundColor = (color: string) => {
        const selectedText = getSelectedText();
        if (selectedText) {
            applyToSelection('background-color', color);
        } else {
            executeCommand('backColor', color);
        }
        setBackgroundColor(color); // Update state to reflect in color picker
    };

    // Advanced formatting functions
    const insertHeading = (level: number) => {
        executeCommand('formatBlock', `h${level}`);
    };

    const insertParagraph = () => {
        executeCommand('formatBlock', 'p');
    };

    const insertBlockquote = () => {
        executeCommand('formatBlock', 'blockquote');
    };

    const insertCode = () => {
        const selection = window.getSelection();
        if (selection && selection.toString()) {
            executeCommand('insertHTML', `<code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; font-family: 'Courier New', monospace;">${selection.toString()}</code>`);
        }
    };

    const insertHorizontalRule = () => {
        executeCommand('insertHTML', '<hr style="margin: 16px 0; border: none; border-top: 1px solid #ccc;">');
    };

    // Enhanced link insertion
    const insertLink = () => {
        if (linkUrl) {
            let displayText = linkText;
            const selection = window.getSelection();

            // If no link text provided, use selected text or URL
            if (!displayText) {
                displayText = selection && selection.toString() ? selection.toString() : linkUrl;
            }

            const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" style="color: #0066cc; text-decoration: underline;">${displayText}</a>`;
            executeCommand('insertHTML', linkHtml);

            setLinkUrl('');
            setLinkText('');
            setIsLinkModalOpen(false);
            // Note: Links are for editing in contentEditable. They will navigate when content is rendered outside the editor.
            handleContentChange();
        }
    };

    // Insert image with better styling
    const insertImage = () => {
        if (imageUrl) {
            const imgHtml = `<img src="${imageUrl}" alt="${imageAlt}" style="max-width: 100%; height: auto; border-radius: 4px; display: block; margin: 8px 0;" />`;
            executeCommand('insertHTML', imgHtml);
            setImageUrl('');
            setImageAlt('');
            setIsImageModalOpen(false);
            handleContentChange(); // Ensure content change is triggered
        }
    };

    // Enhanced table insertion with responsive design
    const insertTable = (rows: number, cols: number) => {
        let tableHtml = `
        <div style="overflow-x: auto; margin: 16px 0;">
            <table style="border-collapse: collapse; min-width: 100%; border: 1px solid #ddd; user-select: text;">
    `;

        for (let i = 0; i < rows; i++) {
            tableHtml += '<tr>';
            for (let j = 0; j < cols; j++) {
                const isHeader = i === 0;
                const style = `
                ${isHeader ? 'background: #DEE9FF; color: #5d93fe; font-weight: bold;' : ''}
                border: 1px solid #ddd;
                padding: 12px;
                min-width: 120px;
                text-align: left;
                vertical-align: top;
                position: relative;
                cursor: text;
            `.trim();
                tableHtml += `<td contenteditable="true" style="${style}" data-cell="true">
                ${isHeader ? `Header ${j + 1}` : `Cell ${i}-${j + 1}`}
            </td>`;
            }
            tableHtml += '</tr>';
        }
        tableHtml += '</table></div>';

        executeCommand('insertHTML', tableHtml);
        // Removed setIsTableModalOpen(false) as there is no table modal
        handleContentChange(); // Trigger content change immediately

        // After inserting, make cells selectable and editable
        setTimeout(() => {
            const tables = editorRef.current?.querySelectorAll('table');
            if (tables) {
                tables.forEach(table => {
                    setupTableCellHandlers(table);
                });
            }
        }, 50); // Small delay to ensure DOM update
    };

    const mergeTableCells = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        // Find the table containing the selection
        let currentNode: Node | null = selection.focusNode;
        let table: HTMLTableElement | null = null;

        while (currentNode && currentNode !== editorRef.current) {
            if (currentNode.nodeType === Node.ELEMENT_NODE) {
                const element = currentNode as Element;
                if (element.tagName === 'TABLE') {
                    table = element as HTMLTableElement;
                    break;
                } else if (element.tagName === 'TD') {
                    table = element.closest('table') as HTMLTableElement;
                    break;
                }
            }
            currentNode = currentNode.parentNode;
        }

        if (!table) {
            alert('Please select cells within a table to merge');
            return;
        }

        // Get selected text range and find cells within it
        const range = selection.getRangeAt(0);
        const cells = Array.from(table.querySelectorAll('td')).filter(cell => {
            return range.intersectsNode(cell);
        });

        if (cells.length < 2) {
            alert('Please select multiple cells to merge');
            return;
        }

        // Helper function to get cell position in table
        const getCellPosition = (cell: HTMLTableCellElement) => {
            const row = cell.parentElement as HTMLTableRowElement;
            const rowIndex = Array.from(table!.rows).indexOf(row);
            const cellIndex = Array.from(row.cells).indexOf(cell);
            return { row: rowIndex, col: cellIndex };
        };

        // Helper function to get actual column index considering colspan
        const getActualColumnIndex = (cell: HTMLTableCellElement) => {
            const row = cell.parentElement as HTMLTableRowElement;
            let actualIndex = 0;

            for (let i = 0; i < Array.from(row.cells).indexOf(cell); i++) {
                const prevCell = row.cells[i];
                actualIndex += parseInt(prevCell.getAttribute('colspan') || '1');
            }

            return actualIndex;
        };

        // Get positions and calculate bounds
        const positions = cells.map(cell => {
            const htmlCell = cell as HTMLTableCellElement;
            const pos = getCellPosition(htmlCell);
            const actualCol = getActualColumnIndex(htmlCell);
            const colspan = parseInt(htmlCell.getAttribute('colspan') || '1');
            const rowspan = parseInt(htmlCell.getAttribute('rowspan') || '1');

            return {
                cell: htmlCell,
                row: pos.row,
                col: actualCol,
                colspan,
                rowspan,
                endRow: pos.row + rowspan - 1,
                endCol: actualCol + colspan - 1
            };
        });

        // Find the bounds of the selection
        const minRow = Math.min(...positions.map(p => p.row));
        const maxRow = Math.max(...positions.map(p => p.endRow));
        const minCol = Math.min(...positions.map(p => p.col));
        const maxCol = Math.max(...positions.map(p => p.endCol));

        // Calculate new spans
        const newRowspan = maxRow - minRow + 1;
        const newColspan = maxCol - minCol + 1;

        // Find the top-left cell (will be the merged cell)
        const topLeftCell = positions.find(p => p.row === minRow && p.col === minCol)?.cell;

        if (!topLeftCell) {
            alert('Unable to determine merge target cell');
            return;
        }

        // Collect content from all cells
        let combinedContent = '';
        const cellContents: string[] = [];

        cells.forEach(cell => {
            const htmlCell = cell as HTMLTableCellElement;
            const cellContent = htmlCell.innerHTML.trim();
            if (cellContent && cellContent !== '') {
                cellContents.push(cellContent);
            }
        });

        // Combine content with separator
        combinedContent = cellContents.join(' | ');

        // Remove all cells except the top-left one
        cells.forEach(cell => {
            const htmlCell = cell as HTMLTableCellElement;
            if (htmlCell !== topLeftCell) {
                htmlCell.remove();
            }
        });

        // Apply new spans and content to the top-left cell
        topLeftCell.innerHTML = combinedContent;

        if (newRowspan > 1) {
            topLeftCell.setAttribute('rowspan', newRowspan.toString());
        } else {
            topLeftCell.removeAttribute('rowspan');
        }

        if (newColspan > 1) {
            topLeftCell.setAttribute('colspan', newColspan.toString());
        } else {
            topLeftCell.removeAttribute('colspan');
        }

        // Style the merged cell
        topLeftCell.style.backgroundColor = '#e3f2fd';
        topLeftCell.style.fontWeight = 'bold';
        topLeftCell.setAttribute('data-merged', 'true');

        // Clear selection
        selection.removeAllRanges();
        handleContentChange();
    };


    const unmergeSelectedCell = (selectedCells: Set<HTMLTableCellElement>) => {
        if (selectedCells.size === 0) {
            alert('Please select a cell to unmerge.');
            return;
        }

        if (selectedCells.size > 1) {
            alert('Please select only one cell to unmerge.');
            return;
        }

        const targetCell = Array.from(selectedCells)[0];
        const initialRowspan = parseInt(targetCell.getAttribute('rowspan') || '1');
        const initialColspan = parseInt(targetCell.getAttribute('colspan') || '1');

        if (!targetCell.hasAttribute('data-merged') && initialRowspan === 1 && initialColspan === 1) {
            alert('The selected cell is not a merged cell.');
            return;
        }

        const table = targetCell.closest('table') as HTMLTableElement;
        const row = targetCell.parentElement as HTMLTableRowElement;

        if (!table || !row) {
            alert('Unable to find the table or row containing the selected cell.');
            return;
        }

        const rowIndex = Array.from(table.rows).indexOf(row);
        const mergedContent = targetCell.innerHTML;
        const splitContents = mergedContent.split(' | ').map(s => s.trim()).filter(s => s !== '');
        let contentIndex = 0;

        const originalCellIndexInRow = Array.from(row.cells).indexOf(targetCell);

        // Reset the original cell
        targetCell.removeAttribute('rowspan');
        targetCell.removeAttribute('colspan');
        targetCell.removeAttribute('data-merged');
        targetCell.style.backgroundColor = '';
        targetCell.style.fontWeight = '';
        targetCell.classList.remove('selected-cell');
        targetCell.innerHTML = splitContents[contentIndex++] || '&nbsp;';

        // Create new cells to fill the unmerged area
        for (let r = 0; r < initialRowspan; r++) {
            const currentRow = table.rows[rowIndex + r];
            if (!currentRow) continue;

            for (let c = 0; c < initialColspan; c++) {
                if (r === 0 && c === 0) continue; // Skip the original cell

                const newCell = document.createElement('td');
                newCell.innerHTML = splitContents[contentIndex++] || '&nbsp;';
                newCell.style.cssText = 'border: 1px solid #ddd; padding: 12px; min-width: 120px; cursor: text; vertical-align: top;';
                newCell.setAttribute('data-cell', 'true');

                const actualCol = originalCellIndexInRow + c;
                let insertPoint: HTMLTableCellElement | null = null;

                let currentActualCol = 0;
                for (let i = 0; i < currentRow.cells.length; i++) {
                    const cell = currentRow.cells[i];
                    const colspan = parseInt(cell.getAttribute('colspan') || '1');
                    if (currentActualCol >= actualCol) {
                        insertPoint = cell;
                        break;
                    }
                    currentActualCol += colspan;
                }

                if (insertPoint) {
                    currentRow.insertBefore(newCell, insertPoint);
                } else {
                    currentRow.appendChild(newCell);
                }
            }
        }

        // Clear the selection
        selectedCells.clear();

        // Re-apply handlers
        setupTableCellHandlers(table);
        handleContentChange();
    };

    // Enhanced setupTableCellHandlers that includes unmerge functionality
    const setupTableCellHandlersWithUnmerge = (table: HTMLTableElement) => {
        // Set up selection (choose your preferred method)
        const selectedCells = setupCellSelection(table);

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'm':
                        // Merge selected cells
                        mergeSelectedCells(selectedCells);
                        e.preventDefault();
                        break;
                    case 'u':
                        // Unmerge selected cell
                        unmergeSelectedCell(selectedCells);
                        e.preventDefault();
                        break;
                }
            }
        });

        return selectedCells;
    };

    // Clear formatting
    const clearFormatting = () => {
        executeCommand('removeFormat');
    };

    // Handle paste with better formatting preservation
    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const clipboardData = e.clipboardData;
        const htmlData = clipboardData.getData('text/html');
        const textData = clipboardData.getData('text/plain');

        if (htmlData) {
            const cleanHtml = htmlData
                .replace(/<script[^>]*>.*?<\/script>/gi, '')
                .replace(/<style[^>]*>.*?<\/style>/gi, '')
                .replace(/on\w+="[^"]*"/gi, '');
            executeCommand('insertHTML', cleanHtml);
        } else {
            executeCommand('insertText', textData);
        }
    };

    // Handle keyboard shortcuts
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'b':
                    e.preventDefault();
                    formatText('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    formatText('italic');
                    break;
                case 'u':
                    e.preventDefault();
                    formatText('underline');
                    break;
                case 'z':
                    e.preventDefault();
                    formatText(e.shiftKey ? 'redo' : 'undo');
                    break;
                case 'k':
                    e.preventDefault();
                    openLinkModal(); // Use openLinkModal to pre-fill text
                    break;
            }
        }
    };

    const addTableRow = () => {
        const selection = window.getSelection();
        if (selection && selection.focusNode) {
            let currentNode = selection.focusNode;
            let table: HTMLTableElement | null = null;

            while (currentNode && currentNode !== editorRef.current) {
                if (currentNode.nodeType === Node.ELEMENT_NODE) {
                    const element = currentNode as Element;
                    if (element.tagName === 'TABLE') {
                        table = element as HTMLTableElement;
                        break;
                    } else {
                        table = element.closest('table') as HTMLTableElement;
                        if (table) break;
                    }
                }
                currentNode = currentNode.parentNode || currentNode;
            }

            if (table) {
                const newRow = table.insertRow();
                let colCount = 0;
                if (table.rows.length > 0) {
                    // Calculate logical column count considering colspans in the first row
                    for (let i = 0; i < table.rows[0].cells.length; i++) {
                        colCount += parseInt(table.rows[0].cells[i].getAttribute('colspan') || '1');
                    }
                } else {
                    colCount = 1;
                }

                for (let i = 0; i < colCount; i++) {
                    const cell = newRow.insertCell();
                    cell.innerHTML = `New Cell`;
                    cell.style.cssText = 'border: 1px solid #ddd; padding: 12px; min-width: 120px; cursor: text;';
                    cell.setAttribute('data-cell', 'true');
                }
                setupTableCellHandlers(table);
                handleContentChange();
            }
        }
    };

    const addTableColumn = () => {
        const selection = window.getSelection();
        if (selection && selection.focusNode) {
            let currentNode = selection.focusNode;
            let table: HTMLTableElement | null = null;

            while (currentNode && currentNode !== editorRef.current) {
                if (currentNode.nodeType === Node.ELEMENT_NODE) {
                    const element = currentNode as Element;
                    if (element.tagName === 'TABLE') {
                        table = element as HTMLTableElement;
                        break;
                    } else {
                        table = element.closest('table') as HTMLTableElement;
                        if (table) break;
                    }
                }
                currentNode = currentNode.parentNode || currentNode;
            }

            if (table) {
                let insertIndex = -1;
                const selection = window.getSelection();
                if (selection && selection.focusNode) {
                    let currentCellElement: HTMLElement | null = selection.focusNode.nodeType === Node.ELEMENT_NODE ? selection.focusNode as HTMLElement : selection.focusNode.parentElement;
                    const currentCellTD = currentCellElement?.closest('td');

                    if (currentCellTD) {
                        const row = currentCellTD.parentElement as HTMLTableRowElement;
                        insertIndex = Array.from(row.cells).indexOf(currentCellTD) + 1;
                    }
                }

                for (let i = 0; i < table.rows.length; i++) {
                    const cell = table.rows[i].insertCell(insertIndex === -1 ? undefined : insertIndex);
                    cell.innerHTML = `New Cell`;
                    cell.style.cssText = 'border: 1px solid #ddd; padding: 12px; min-width: 120px; cursor: text;';
                    cell.setAttribute('data-cell', 'true');
                    if (i === 0) { // Apply header style to the new cell in the first row
                        cell.style.background = '#DEE9FF';
                        cell.style.color = '#5d93fe';
                        cell.style.fontWeight = 'bold';
                    }
                }
                setupTableCellHandlers(table);
                handleContentChange();
            }
        }
    };

    // Initialize link modal with selected text
    const openLinkModal = () => {
        const selectedText = getSelectedText();
        if (selectedText) {
            setLinkText(selectedText);
        }
        setIsLinkModalOpen(true);
    };

    // Fixed TypeScript version with proper type checking
    const setupMultiCellSelection = (table: HTMLTableElement) => {
        let selectedCells = new Set<HTMLTableCellElement>();

        table.addEventListener('click', (e: MouseEvent) => {
            // Type guard to check if target is an HTMLElement and specifically a TD
            if (e.target && e.target instanceof HTMLElement && e.target.tagName === 'TD') {
                const cell = e.target as HTMLTableCellElement;

                if (e.ctrlKey || e.metaKey) {
                    // Multi-select with Ctrl/Cmd
                    if (selectedCells.has(cell)) {
                        selectedCells.delete(cell);
                        cell.classList.remove('selected-cell');
                    } else {
                        selectedCells.add(cell);
                        cell.classList.add('selected-cell');
                    }
                } else {
                    // Single select (clear others)
                    table.querySelectorAll('.selected-cell').forEach(cell => {
                        cell.classList.remove('selected-cell');
                    });
                    selectedCells.clear();
                    selectedCells.add(cell);
                    cell.classList.add('selected-cell');
                }
                e.preventDefault();
            }
        });

        return selectedCells;
    };

    // Fixed drag selection method
    const setupCellSelection = (table: HTMLTableElement) => {
        let isSelecting = false;
        let selectedCells = new Set<HTMLTableCellElement>();

        table.addEventListener('mousedown', (e: MouseEvent) => {
            if (e.target && e.target instanceof HTMLElement && e.target.tagName === 'TD') {
                const cell = e.target as HTMLTableCellElement;
                isSelecting = true;
                selectedCells.clear();

                // Clear any existing selection
                table.querySelectorAll('.selected-cell').forEach(cell => {
                    cell.classList.remove('selected-cell');
                });

                // Start selection with clicked cell
                selectedCells.add(cell);
                cell.classList.add('selected-cell');
                e.preventDefault();
            }
        });

        table.addEventListener('mouseover', (e: MouseEvent) => {
            if (isSelecting && e.target && e.target instanceof HTMLElement && e.target.tagName === 'TD') {
                const cell = e.target as HTMLTableCellElement;
                // Only add the cell you're actually hovering over
                if (!selectedCells.has(cell)) {
                    selectedCells.add(cell);
                    cell.classList.add('selected-cell');
                }
            }
        });

        document.addEventListener('mouseup', () => {
            isSelecting = false;
        });

        return selectedCells;
    };

    // Enhanced merge function that works with the selection
    const mergeSelectedCells = (selectedCells: Set<HTMLTableCellElement>) => {
        const cellsArray = Array.from(selectedCells);

        if (cellsArray.length < 2) {
            alert('Please select multiple cells to merge');
            return;
        }

        const table = cellsArray[0].closest('table') as HTMLTableElement;
        if (!table) {
            alert('Selected cells must be in a table');
            return;
        }

        // Your existing merge logic here - adapted for the selected cells
        performCellMerge(cellsArray, table);

        // Clear selection
        selectedCells.forEach(cell => cell.classList.remove('selected-cell'));
        selectedCells.clear();
    };

    // Helper function to perform the actual merge
    const performCellMerge = (cells: HTMLTableCellElement[], table: HTMLTableElement) => {
        // Helper function to get cell position in table
        const getCellPosition = (cell: HTMLTableCellElement) => {
            const row = cell.parentElement as HTMLTableRowElement;
            const rowIndex = Array.from(table.rows).indexOf(row);
            const cellIndex = Array.from(row.cells).indexOf(cell);
            return { row: rowIndex, col: cellIndex };
        };

        // Helper function to get actual column index considering colspan
        const getActualColumnIndex = (cell: HTMLTableCellElement) => {
            const row = cell.parentElement as HTMLTableRowElement;
            let actualIndex = 0;

            for (let i = 0; i < Array.from(row.cells).indexOf(cell); i++) {
                const prevCell = row.cells[i];
                actualIndex += parseInt(prevCell.getAttribute('colspan') || '1');
            }

            return actualIndex;
        };

        // Get positions and calculate bounds
        const positions = cells.map(cell => {
            const pos = getCellPosition(cell);
            const actualCol = getActualColumnIndex(cell);
            const colspan = parseInt(cell.getAttribute('colspan') || '1');
            const rowspan = parseInt(cell.getAttribute('rowspan') || '1');

            return {
                cell,
                row: pos.row,
                col: actualCol,
                colspan,
                rowspan,
                endRow: pos.row + rowspan - 1,
                endCol: actualCol + colspan - 1
            };
        });

        // Find the bounds of the selection
        const minRow = Math.min(...positions.map(p => p.row));
        const maxRow = Math.max(...positions.map(p => p.endRow));
        const minCol = Math.min(...positions.map(p => p.col));
        const maxCol = Math.max(...positions.map(p => p.endCol));

        // Calculate new spans
        const newRowspan = maxRow - minRow + 1;
        const newColspan = maxCol - minCol + 1;

        // Find the top-left cell (will be the merged cell)
        const topLeftCell = positions.find(p => p.row === minRow && p.col === minCol)?.cell;

        if (!topLeftCell) {
            alert('Unable to determine merge target cell');
            return;
        }

        // Collect content from all cells
        const cellContents: string[] = [];
        cells.forEach(cell => {
            const cellContent = cell.innerHTML.trim();
            if (cellContent && cellContent !== '') {
                cellContents.push(cellContent);
            }
        });

        // Combine content with separator
        const combinedContent = cellContents.join(' | ');

        // Remove all cells except the top-left one
        cells.forEach(cell => {
            if (cell !== topLeftCell) {
                cell.remove();
            }
        });

        // Apply new spans and content to the top-left cell
        topLeftCell.innerHTML = combinedContent;

        if (newRowspan > 1) {
            topLeftCell.setAttribute('rowspan', newRowspan.toString());
        } else {
            topLeftCell.removeAttribute('rowspan');
        }

        if (newColspan > 1) {
            topLeftCell.setAttribute('colspan', newColspan.toString());
        } else {
            topLeftCell.removeAttribute('colspan');
        }

        // Style the merged cell
        topLeftCell.style.backgroundColor = '#e3f2fd';
        topLeftCell.style.fontWeight = 'bold';
        topLeftCell.setAttribute('data-merged', 'true');
    };

    // Where to call these functions - integrate with your existing setup
    const setupTableCellHandlers = (table: HTMLTableElement) => {
        const selectedCells = setupCellSelection(table);
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
                mergeSelectedCells(selectedCells);
                e.preventDefault();
            }
        });

        // Return the selected cells set so you can use it elsewhere
        return selectedCells;
    };

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = initialContent;
            updateToolbarState();

            const tables = editorRef.current.querySelectorAll('table');
            tables.forEach(table => {
                // Use the enhanced version that includes unmerge
                const selectedCells = setupTableCellHandlersWithUnmerge(table as HTMLTableElement);
            });

            document.addEventListener('selectionchange', updateToolbarState);
            const observer = new MutationObserver(handleContentChange);
            observer.observe(editorRef.current, {
                childList: true,
                subtree: true,
                attributes: true
            });

            return () => {
                document.removeEventListener('selectionchange', updateToolbarState);
                observer.disconnect();
            };
        }
    }, [initialContent, updateToolbarState, handleContentChange]);

    React.useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        const style = document.createElement('style');
        style.textContent = `
                                                [contenteditable]:empty:before {
                                                    content: attr(data-placeholder);
                                                    color: #9ca3af;
                                                    pointer-events: none;
                                                }

                                                /* Table cell selection styles - primarily for visual feedback during editing/hover */
                                                table td {
                                                    user-select: text;
                                                    -webkit-user-select: text;
                                                    -moz-user-select: text;
                                                    -ms-user-select: text;
                                                }

                                                table td.selected-cell {
                                                    background-color: #dbeafe !important;
                                                    outline: 2px solid #3b82f6;
                                                    outline-offset: -1px;
                                                }

                                                table td:hover {
                                                    background-color: #f8fafc;
                                                }

                                                table td[contenteditable="true"] {
                                                    border: 1px solid #3b82f6 !important;
                                                    background-color: #fffbeb;
                                                }

                                                table {
                                                    user-select: text;
                                                    -webkit-user-select: text;
                                                }

                                                /* Placeholder style for empty contenteditable */
                                                [contenteditable]:empty:before {
                                                    content: attr(data-placeholder);
                                                    color: #9ca3af;
                                                    pointer-events: none;
                                                }  `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
            if (document.head.contains(link)) {
                document.head.removeChild(link);
            }
        };
    }, []);

    return (
        <div style={{
            position: 'relative',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            overflow: 'visible',
            fontFamily: 'system-ui, sans-serif',
            maxWidth: '100%',
        }}>
            <div style={{
                position: 'sticky',
                zIndex: 98,
                top: '74px',
                backgroundColor: '#f8fafc',
                padding: '12px',
                borderBottom: '1px solid #e2e8f0',
                overflowX: 'auto',
                whiteSpace: 'nowrap'
            }}>   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', minWidth: 'max-content' }}>
                    {/* Font Controls */}
                    <select
                        value={fontFamily}
                        onChange={(e) => changeFontFamily(e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db', minWidth: '120px' }}
                    >
                        <option value="Arial">Arial</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Trebuchet MS">Trebuchet MS</option>
                        <option value="Comic Sans MS">Comic Sans MS</option>
                        <option value="Roboto">Roboto</option>
                    </select>

                    <select
                        value={fontSize}
                        onChange={(e) => changeFontSize(e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db', minWidth: '70px' }}
                    >
                        <option value="1">8pt</option>
                        <option value="2">10pt</option>
                        <option value="3">12pt</option>
                        <option value="4">14pt</option>
                        <option value="5">18pt</option>
                        <option value="6">24pt</option>
                        <option value="7">36pt</option>
                    </select>

                    {/* Heading dropdown */}
                    <select
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === 'p') insertParagraph();
                            else if (value.startsWith('h')) insertHeading(parseInt(value[1]));
                            else if (value === 'blockquote') insertBlockquote();
                            e.target.value = ''; // Reset dropdown
                        }}
                        style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db', minWidth: '100px' }}
                        defaultValue=""
                    >
                        <option value="">Format</option>
                        <option value="p">Paragraph</option>
                        <option value="h1">Heading 1</option>
                        <option value="h2">Heading 2</option>
                        <option value="h3">Heading 3</option>
                        <option value="h4">Heading 4</option>
                        <option value="blockquote">Quote</option>
                    </select>

                    <div style={{ width: '1px', height: '24px', backgroundColor: '#d1d5db' }}></div>

                    {/* Color Controls */}
                    <input
                        type="color"
                        value={textColor}
                        onChange={(e) => changeTextColor(e.target.value)}
                        style={{ width: '32px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        title="Text Color (applies to selection if text is selected)"
                    />

                    <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => changeBackgroundColor(e.target.value)}
                        style={{ width: '32px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        title="Background Color (applies to selection if text is selected)"
                    />

                    <div style={{ width: '1px', height: '24px', backgroundColor: '#d1d5db' }}></div>
                    <button
                        onClick={() => {
                            const currentSize = parseInt(fontSize);
                            if (currentSize < 7) changeFontSize((currentSize + 1).toString());
                        }}
                        title="Increase Font Size"
                        style={{
                            padding: '6px 8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '32px'
                        }}
                    >
                        A+
                    </button>

                    <button
                        onClick={() => {
                            const currentSize = parseInt(fontSize);
                            if (currentSize > 1) changeFontSize((currentSize - 1).toString());
                        }}
                        title="Decrease Font Size"
                        style={{
                            padding: '6px 8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '32px'
                        }}
                    >
                        A-
                    </button>

                    {/* Text Formatting */}
                    {[
                        { icon: <BoldIcon />, command: 'bold', title: 'Bold (Ctrl+B)' },
                        { icon: <ItalicIcon />, command: 'italic', title: 'Italic (Ctrl+I)' },
                        { icon: <UnderlineIcon />, command: 'underline', title: 'Underline (Ctrl+U)' },
                        { icon: <StrikethroughIcon />, command: 'strikeThrough', title: 'Strikethrough' },
                    ].map((item, index) => (
                        <button
                            key={index}
                            onClick={() => formatText(item.command)}
                            title={item.title}
                            style={{
                                padding: '6px 8px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                backgroundColor: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '32px'
                            }}
                        >
                            {item.icon}
                        </button>
                    ))}

                    <div style={{ width: '1px', height: '24px', backgroundColor: '#d1d5db' }}></div>

                    {/* Alignment */}
                    {[
                        { icon: <AlignLeftIcon />, command: 'justifyLeft', title: 'Align Left' },
                        { icon: <AlignCenterIcon />, command: 'justifyCenter', title: 'Align Center' },
                        { icon: <AlignRightIcon />, command: 'justifyRight', title: 'Align Right' },
                        { icon: <AlignJustifyIcon />, command: 'justifyFull', title: 'Justify' },
                    ].map((item, index) => (
                        <button
                            key={index}
                            onClick={() => formatText(item.command)}
                            title={item.title}
                            style={{
                                padding: '6px 8px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                backgroundColor: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '32px'
                            }}
                        >
                            {item.icon}
                        </button>
                    ))}

                    <div style={{ width: '1px', height: '24px', backgroundColor: '#d1d5db' }}></div>

                    {/* Lists */}
                    {[
                        { icon: <ListIcon />, command: 'insertUnorderedList', title: 'Bullet List' },
                        { icon: <NumberListIcon />, command: 'insertOrderedList', title: 'Numbered List' },
                        { icon: <IndentIcon />, command: 'indent', title: 'Increase Indent' },
                        { icon: <OutdentIcon />, command: 'outdent', title: 'Decrease Indent' },
                    ].map((item, index) => (
                        <button
                            key={index}
                            onClick={() => formatText(item.command)}
                            title={item.title}
                            style={{
                                padding: '6px 8px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                backgroundColor: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '32px'
                            }}
                        >
                            {item.icon}
                        </button>
                    ))}

                    <div style={{ width: '1px', height: '24px', backgroundColor: '#d1d5db' }}></div>

                    {/* Insert Elements */}
                    <button
                        onClick={openLinkModal}
                        title="Insert Link (Ctrl+K)"
                        style={{
                            padding: '6px 8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '32px'
                        }}
                    >
                        <LinkIcon />
                    </button>

                    <button
                        onClick={() => setIsImageModalOpen(true)}
                        title="Insert Image"
                        style={{
                            padding: '6px 8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '32px'
                        }}
                    >
                        <ImageIcon />
                    </button>

                    <button
                        title="Insert Table"
                        style={{
                            padding: '6px 8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '32px'
                        }}
                        onClick={() => insertTable(2, 1)}
                    >
                        <TableIcon />
                    </button>

                    {/* Table Controls */}
                    <button
                        onClick={addTableRow}
                        title="Add Table Row"
                        style={{
                            padding: '6px 8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '32px'
                        }}
                    >
                        +R
                    </button>

                    <button
                        onClick={addTableColumn}
                        title="Add Table Column"
                        style={{
                            padding: '6px 8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '32px'
                        }}
                    >
                        +C
                    </button>
                    <button
                        onClick={mergeTableCells}
                        title="Merge Selected Table Cells"
                        style={{
                            padding: '6px 8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '32px'
                        }}
                    >
                        <MergeIcon />
                    </button>

                    <button
                        onClick={() => unmergeSelectedCell(selectedCells)}
                        title="Unmerge Selected Table Cells (experimental)"
                        style={{
                            padding: '6px 8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '32px'
                        }}
                    >
                        <SplitIcon />
                    </button>

                    <button
                        onClick={insertCode}
                        title="Insert Code"
                        style={{
                            padding: '6px 8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '32px'
                        }}
                    >
                        <CodeIcon />
                    </button>

                    <button
                        onClick={insertHorizontalRule}
                        title="Insert Horizontal Rule"
                        style={{
                            padding: '6px 8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '32px'
                        }}
                    >
                        —
                    </button>

                    <div style={{ width: '1px', height: '24px', backgroundColor: '#d1d5db' }}></div>

                    {/* Undo/Redo */}
                    {[
                        { icon: <UndoIcon />, command: 'undo', title: 'Undo (Ctrl+Z)' },
                        { icon: <RedoIcon />, command: 'redo', title: 'Redo (Ctrl+Shift+Z)' },
                    ].map((item, index) => (
                        <button
                            key={index}
                            onClick={() => formatText(item.command)}
                            title={item.title}
                            style={{
                                padding: '6px 8px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                backgroundColor: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '32px'
                            }}
                        >
                            {item.icon}
                        </button>
                    ))}

                    <button
                        onClick={clearFormatting}
                        title="Clear Formatting"
                        style={{
                            padding: '6px 8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '32px'
                        }}
                    >
                        <ClearIcon />
                    </button>
                </div>
            </div>

            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleContentChange}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                style={{
                    padding: '16px',
                    height: 'auto',
                    minHeight: height,
                    outline: 'none',
                    fontSize: '14px',
                    fontFamily: fontFamily,
                    color: textColor,
                    backgroundColor: 'white',
                    lineHeight: '1.6',
                    cursor: 'text',
                    overflowY: 'auto',
                }}
                data-placeholder={placeholder}
            />

            {/* Link Modal */}
            {isLinkModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '24px',
                        borderRadius: '8px',
                        width: '400px',
                        maxWidth: '90vw'
                    }}>
                        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>Insert Link</h3>
                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Link Text</label>
                            <input
                                type="text"
                                value={linkText}
                                onChange={(e) => setLinkText(e.target.value)}
                                placeholder="Enter link text"
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>URL</label>
                            <input
                                type="url"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                placeholder="https://example.com"
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setIsLinkModalOpen(false)}
                                style={{
                                    padding: '8px 16px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '4px',
                                    backgroundColor: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={insertLink}
                                style={{
                                    padding: '8px 16px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                Insert Link
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Modal */}
            {isImageModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '24px',
                        borderRadius: '8px',
                        width: '400px',
                        maxWidth: '90vw'
                    }}>
                        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>Insert Image</h3>
                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Image URL</label>
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Alt Text</label>
                            <input
                                type="text"
                                value={imageAlt}
                                onChange={(e) => setImageAlt(e.target.value)}
                                placeholder="Description of the image"
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setIsImageModalOpen(false)}
                                style={{
                                    padding: '8px 16px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '4px',
                                    backgroundColor: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={insertImage}
                                style={{
                                    padding: '8px 16px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                Insert Image
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default RichTextEditor;