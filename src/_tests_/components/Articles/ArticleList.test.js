import React from 'react'
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { shallow } from "enzyme";
import ArticleList from "../../../components/Articles/ArticleList"
import Article from '../../../components/Articles/Article'
import { consoleSpyForProptypeError } from '../../../setupTests'

const mockStore = configureMockStore([thunk])

describe("ArticleList as DailyArticleList", () => {
	describe("with Articles", ()=>{
		let store;
		let component;
		consoleSpyForProptypeError()

		const initialState = {articleReducer:{
		errorMsg:'',
		isLoading: false,
		dailyArticles: [{id: 30, 
			title:"daily3 some third article", 
			description: "daily3 some third description", 
			url: "daily3 someUrl", 
			urlToImage: "daily3 url third to image", 
			source:{name: "daily3 source"}, 
			isBookmarked: false}
		]}
		}

		it("should render without errors", () =>{
			store = mockStore(initialState)

			component= shallow(<ArticleList store={store} listType='daily'/>).dive({context:{store}}).dive()
			expect(component.length).toEqual(1)
			expect(component.find(Article).length).toEqual(1)
			expect(component.find(Article).props().articleType).toEqual('daily')

			expect(component.find('.noArticleError').length).toEqual(0)
			expect(component.find('.loadingMsg').length).toEqual(0)
			expect(console.error).not.toHaveBeenCalled()
		})
		
		it("should throw error when wrong proptypes are provided", () =>{
			shallow(<ArticleList store={store} listType={true}/>)
			expect(console.error).toHaveBeenCalledTimes(1)
		})
	})

	describe("without articles", ()=>{
		let store;
		let component;
		
		consoleSpyForProptypeError()

		it('should render isLoading when loading articles' , () => {
			const state = {articleReducer:{
				errorMsg:'',
				isLoading: true,
				dailyArticles: []}
			}
	
			store = mockStore(state)
			component = shallow(<ArticleList store={store} listType='daily'/>).dive({context:{store}}).dive()

			expect(component.find('.loadingMsg').length).toEqual(1)

			expect(component.find(Article).length).toEqual(0)
			expect(component.find('.noArticleError').length).toEqual(0)

		})

		it('should render errormsg when error occures', ()=>{

		const state = {articleReducer:{
			errorMsg:'some error',
			isLoading: false,
			dailyArticles: []}
		}
			store = mockStore(state)
			component = shallow(<ArticleList store={store} listType='daily'/>).dive({context:{store}}).dive()

			expect(component.find('.loadingMsg').length).toEqual(0)

			expect(component.find(Article).length).toEqual(0)
			expect(component.find('.noArticleError').length).toEqual(1)
			expect(component.find('.noArticleError').text()).toEqual('some error')
		})
	})
	
})

describe("ArticleList as SavedArticleList", ()=>{
	let store;
	let component;
	consoleSpyForProptypeError()

	const initialState = {articleReducer:{
	errorMsg:'',
	isLoading: false,
	savedArticles: [{id: 30, 
		title:"daily3 some third article", 
		description: "daily3 some third description", 
		url: "daily3 someUrl", 
		urlToImage: "daily3 url third to image", 
		source:{name: "daily3 source"}, 
		isBookmarked: false}
	]}
	}
	it("should render without errors", () =>{
		store = mockStore(initialState)

		component= shallow(<ArticleList store={store} listType='saved'/>).dive({context:{store}}).dive()
		expect(component.length).toEqual(1)
		expect(component.find(Article).length).toEqual(1)

		console.log(component.debug())
		expect(component.find(Article).props().articleType).toEqual('saved')

		expect(component.find('.noArticleError').length).toEqual(0)
		expect(component.find('.loadingMsg').length).toEqual(0)
		expect(console.error).not.toHaveBeenCalled()

	})
})
	