import 'skatejs-web-components';

import * as skate from 'skatejs';
const React = { createElement: skate.h };



customElements.define('svg-import', class extends skate.Component {
	static get props () {
		return {
			// By declaring the property an attribute, we can now pass an initial value
			// for the count as part of the HTML.
			src: skate.prop.string({ attribute: true }),
			width: skate.prop.number({ attribute: true }),
			height: skate.prop.number({ attribute: true }),
		};
	}
	updateXml(){
		if(!jQuery){
			throw new TypeError('svg-import require jQuery to work!');
		}
		let comp = this;

		comp.xmlData = '';
		const $ = jQuery;


		$.get({url:this.src,cache:true,async:false})
			.then(function (xml) {

				var $svg = $(xml).find('svg');
				$svg = $svg.removeAttr('xmlns:a');

				if(!$svg.attr('viewBox') && comp.width && comp.height) {
					$svg.attr('viewBox', '0 0 ' + comp.height + ' ' + comp.width)
				}

				comp.xmlData = $svg.html();

			})
	}
	connectedCallback () {
		// Ensure we call the parent.
		super.connectedCallback();
		this.updateXml();

	}
	attributeChangedCallback (name, oldValue, newValue) {
		super.attributeChangedCallback(name, oldValue, newValue);
		this.updateXml();
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
			.svg-import-wrap{
				overflow:hidden;
				margin:0;
				padding:0;
				width:${comp.width}px;
				height:${comp.height}px;
				display:inline-block;
			}
		`;

		return ([
			skate.h('style', defBoxStyle),
			<figure role="image" className="svg-import-wrap">{comp.xmlData}</figure>
		])
	}
});
