/* eslint-disable no-undef */
import React from "react";
import Home from "../../components/Home";
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ArticleList from "../../components/ArticleList"

jest.mock("../../components/ArticleList")


describe("Home", () => {
  let component;
  let store;

  const mockStore = configureMockStore([thunk])

  beforeEach(()=>{
    store = mockStore({userReducer: {
      loggedIn : true
     } 
    })

    store.dispatch = jest.fn()

    component = mount(<Home store={store} loadDailyArticles={jest.fn()} />)
  })
  it("should render childrens", () => {

    expect(component.find("h1")).toHaveLength(1);
  
    expect(component.find(ArticleList)).toHaveLength(1);
    expect(store.dispatch).toHaveBeenCalled()

  });
});
