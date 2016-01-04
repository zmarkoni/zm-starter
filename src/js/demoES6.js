"use strict";
// ES6 module export example
export function es6Welcome(version) {

	const html = 
		`<div class="row">
			<div class="card" style="width:100%;background:#fff;margin-bottom:20px;border-radius:5px;-webkit-box-shadow:0px 2px 2px rgba(0, 0, 0, 0.1);box-shadow:0px 2px 2px rgba(0, 0, 0, 0.1);position:relative;padding:30px 40px 30px 40px;">
				<p>Hello, this is an <strong>ES${version} module</strong></p>
			</div>
			<div class="card" style="width:100%;background:#fff;margin-bottom:20px;border-radius:5px;-webkit-box-shadow:0px 2px 2px rgba(0, 0, 0, 0.1);box-shadow:0px 2px 2px rgba(0, 0, 0, 0.1);position:relative;padding:30px 40px 30px 40px;">
				<p>Check out the <a href="/style-guide.html">Style Guide</a></p>
		</div>
		`;
	
	const newEl = document.createElement('div');
	newEl.className='container'
	newEl.innerHTML = html;
	const es6Content = document.body.appendChild(newEl);
	return es6Content;
}
