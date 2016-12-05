import 'skatejs-web-components';

import {Component, prop, h} from 'skatejs';
const React = { createElement: h };

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/Observable/dom/ajax';
import 'rxjs/add/observable/empty';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinct';


customElements.define('svg-import', class extends Component {
	static get props () {
		return {
			// By declaring the property an attribute, we can now pass an initial value
			// for the count as part of the HTML.
			src: prop.string({ attribute: true }),
			'inner-style': prop.string({ attribute: true }),
		};
	}

	constructor(){
		super();
		this.src$ = new BehaviorSubject(this.src)
			.filter(val => val && typeof val === 'string')
			.distinct( (src) => src + this['inner-style'])
			.switchMap(src => this.fetchXml(src))
			.filter(xml => !!xml);
	}


	fetchXml(src){

		return ajax({url:src,cache:true,crossDomain:true,responseType:'text'})
			.map(function (response) {
				return jQuery.parseXML(response.response)
			})
			.catch((err)=>{
				console.error(err);
				return Observable.empty();
			});
	}

	getWraper(){
		return jQuery(this.shadowRoot).find('.svg-import-wrap').get(0);
	}

	updateXml(xml){
		let comp = this;
		if(!xml){return}
		const $ = jQuery;


		var $svg = $(xml).find('svg');
		var svg = $svg.get(0);

		svg.removeAttribute('xmlns:a');
		if(comp.width && comp.height){
			// svg.hasAttribute('viewBox') ? svg.setAttribute('viewBox', '0 0 ' + comp.height + ' ' + comp.width) : '';
			svg.setAttribute('width','100%');
			svg.setAttribute('height','100%');
		}

		var wraper = comp.getWraper();

		if(wraper){
			wraper.innerHTML = '';
			wraper.appendChild(svg);
		}

	}
	connectedCallback () {
		// Ensure we call the parent.
		super.connectedCallback();
		//this.updateXml();
		if(!jQuery){
			throw new TypeError('svg-import require jQuery to work!');
		}

		this.srcSubscription = this.src$
			.subscribe(
				(src)=>this.updateXml(src),
				(err)=>console.error(err));

	}
	attributeChangedCallback (name, oldValue, newValue) {
		super.attributeChangedCallback(name, oldValue, newValue);
		if(name === 'src'){
			this.src$.next(newValue);
		}
	}
	disconnectedCallback () {
		// Ensure we callback the parent.
		super.disconnectedCallback();
		if(this.srcSubscription){
			this.srcSubscription.unsubscribe();
		}
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

		this.src$.next(comp.src);

		return (
			<div>
				<style>{defBoxStyle + comp['inner-style']}</style>
				<figure role="image" className="svg-import-wrap"></figure>
			</div>
		)
	}
});
