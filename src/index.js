import 'skatejs-web-components';

import {Component, prop, h} from 'skatejs';
const React = { createElement: h };



customElements.define('svg-import', class extends Component {
	static get props () {
		return {
			// By declaring the property an attribute, we can now pass an initial value
			// for the count as part of the HTML.
			src: prop.string({ attribute: true }),
			'inner-style': prop.string({ attribute: true }),
		};
	}
	updateXml(){
		if(!jQuery){
			throw new TypeError('svg-import require jQuery to work!');
		}
		let comp = this;


		const $ = jQuery;


		$.get({url:this.src,cache:true,async:true})
			.then(function (xml) {

				var $svg = $(xml).find('svg');
				var svg = $svg.get(0);
				svg.removeAttribute('xmlns:a');
				if(comp.width && comp.height){
					// svg.hasAttribute('viewBox') ? svg.setAttribute('viewBox', '0 0 ' + comp.height + ' ' + comp.width) : '';
					svg.setAttribute('width','100%');
					svg.setAttribute('height','100%');
				}

				// comp.xmlData = $svg.clone().wrap('<div/>').parent().html();
				var wraper = $(comp.shadowRoot).find('.svg-import-wrap').get(0);

				wraper.innerHTML = '';
				wraper.appendChild(svg);

			})
	}
	connectedCallback () {
		// Ensure we call the parent.
		super.connectedCallback();
		//this.updateXml();

	}
	attributeChangedCallback (name, oldValue, newValue) {
		super.attributeChangedCallback(name, oldValue, newValue);
		if(name == 'src'){
			this.updateXml();
		}

	}
	disconnectedCallback () {
		// Ensure we callback the parent.
		super.disconnectedCallback();

		// If we didn't clean up after ourselves, we'd continue to render
	}
	renderCallback () {
		// By separating the strings (and not using template literals or string
		// concatenation) it ensures the strings are diffed indepenedently. If
		// you select "Count" with your mouse, it will not deselect whenr endered.
		var comp = this;

		const defBoxStyle = `
			:host{display:inline-block;}
			.svg-import-wrap{
				overflow:hidden;
				margin:0;
				padding:0;
				width:100%;
				height:100%;
				min-width:5px;
				min-height:5px;
				display:block;
			}
			svg{
				width:100%;
				height:100%;
			}
		`;

		return ([
			h('style', defBoxStyle + comp['inner-style']),
			<figure role="image" className="svg-import-wrap"></figure>
		])
	}
});
