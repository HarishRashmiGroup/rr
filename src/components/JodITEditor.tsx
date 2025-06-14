import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const JodITEditor = ({ placeholder = 'Start typing here...' }) => {
	const editor = useRef(null);
	const [content, setContent] = useState(`<p style="font-size: 28px;">
  🖥️ <span style="color: #5d93fe;"><strong>RPSC Computer Programmer Recruitment 2025 – Complete Guide</strong></span>
</p>

<hr style="height: 3px; background-color: #5d93fe; border: none; margin: 1rem 0;">

<p>
  <img src="https://th.bing.com/th/id/OIP.wc_fKGoRnwYcLTgMArppMQHaD7?pid=ImgDet&amp;rs=1" alt="RPSC Recruitment Banner" style="width: 100%; max-width: 100%; max-height: 200px; border-radius: 10px;">
</p>

<p>
  Are you an aspiring Computer Programmer looking for a government job in Rajasthan? The Rajasthan Public Service Commission (RPSC) has officially released a recruitment notification for Computer Programmer posts in various government departments. This post is a complete guide for aspirants — from eligibility to syllabus to tips!
</p>

<h2 style="color: #5d93fe;">📌 <strong>Overview of RPSC Computer Programmer Recruitment</strong></h2>

<table style="width: 100%; border-collapse: collapse;" border="1" cellpadding="8">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Feature</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Recruiting Body</td><td>Rajasthan Public Service Commission (RPSC)</td></tr>
    <tr><td>Post Name</td><td>Computer Programmer</td></tr>
    <tr><td>Advt No.</td><td>[To be updated as per official notice]</td></tr>
    <tr><td>Job Location</td><td>Rajasthan</td></tr>
    <tr><td>Total Vacancies</td><td>100+ (Expected)</td></tr>
    <tr><td>Application Mode</td><td>Online</td></tr>
    <tr>
      <td>Official Website</td>
      <td><a href="https://rpsc.rajasthan.gov.in" target="_blank">https://rpsc.rajasthan.gov.in</a></td>
    </tr>
  </tbody>
</table>

<h2 style="color: #5d93fe;">📅 <strong>Important Dates</strong></h2>

<table style="width: 100%; border-collapse: collapse;" border="1" cellpadding="8">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Event</th>
      <th>Date (Tentative)</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Notification Release Date</td><td>June 2025</td></tr>
    <tr><td>Online Application Starts</td><td>July 2025</td></tr>
    <tr><td>Last Date to Apply</td><td>August 2025</td></tr>
    <tr><td>Exam Date</td><td>Oct–Nov 2025</td></tr>
    <tr><td>Admit Card Release</td><td>10 days before exam</td></tr>
  </tbody>
</table>

<h2 style="color: #5d93fe;">✅ <strong>Eligibility Criteria</strong></h2>

<h3 style="color: #5d93fe;">1. Educational Qualification</h3>

<table style="width: 100%; border-collapse: collapse;" border="1" cellpadding="8">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Qualification</th>
      <th>Requirements</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Degree</td>
      <td>B.E./B.Tech/M.Sc. in CS/IT or MCA or equivalent</td>
    </tr>
    <tr>
      <td>Preferred</td>
      <td>Knowledge of Rajasthani culture and Hindi in Devanagari script</td>
    </tr>
  </tbody>
</table>

<h3 style="color: #5d93fe;">2. Age Limit (as on 01.01.2026)</h3>

<table style="width: 100%; border-collapse: collapse;" border="1" cellpadding="8">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Category</th>
      <th>Age Limit</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>General</td><td>21–40 Years</td></tr>
    <tr><td>SC/ST/OBC/MBC (Rajasthan)</td><td>Relaxation as per rules</td></tr>
  </tbody>
</table>

<h3 style="color: #5d93fe;">🧾 <strong>Application Process: Steps to Apply Online</strong></h3>
<ol>
  <li>Visit the official RPSC website: <a href="https://rpsc.rajasthan.gov.in" target="_blank">https://rpsc.rajasthan.gov.in</a></li>
  <li>Register on SSO Rajasthan Portal: <a href="https://sso.rajasthan.gov.in" target="_blank">https://sso.rajasthan.gov.in</a></li>
  <li>Go to "Recruitment Portal" → Find "Computer Programmer Recruitment 2025"</li>
  <li>Fill the form, upload documents, pay the fee</li>
  <li>Submit and print for reference</li>
</ol>

<h3 style="color: #5d93fe;">💳 <strong>Application Fees</strong></h3>

<table style="width: 100%; border-collapse: collapse;" border="1" cellpadding="8">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Category</th>
      <th>Fee</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>General</td><td>₹600</td></tr>
    <tr><td>OBC (Non-creamy)</td><td>₹400</td></tr>
    <tr><td>SC/ST/PwD (Rajasthan)</td><td>₹400</td></tr>
  </tbody>
</table>

<h3 style="color: #5d93fe;">📢 <strong>Final Words</strong></h3>

<p>
  This is a golden opportunity for Computer Science graduates who want a secure government job in Rajasthan. Start your preparation today with a strategic plan, and stay updated with official announcements.
</p>

<p>📣 Stay tuned and bookmark this page for updates and exam resources!</p>

<h3 style="color: #5d93fe;"><strong>❓ FAQs – RPSC Computer Programmer Recruitment</strong></h3>

<p><strong>Q.</strong> What is the salary for a Computer Programmer in Rajasthan?<br>
<strong>A.</strong> The salary is as per Level-11 Pay Matrix (Approx ₹56,100/month + allowances).</p>

<p><strong>Q.</strong> Can final-year students apply?<br>
<strong>A.</strong> Only if the final result is declared before the document verification.</p>

<p><strong>Q.</strong> Is prior work experience required?<br>
<strong>A.</strong> No, freshers can apply.</p>
`);

	const config = useMemo(() => ({
		readonly: false,
		placeholder: placeholder || 'Start typings...'
	}),
		[placeholder]
	);

	return (
		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => { }}
		/>
	);
};
export default JodITEditor;