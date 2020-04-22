import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import LoggedInContent from './DisplayContent';
 

describe('Logged In Content', () => {
  const makeComponent = (props) => mount(
    <LoggedInContent className="clz" {...props}>
      Content
    </LoggedInContent>
  );
  const fullyRenderedHtml = '<div class="clz">Content</div>';
  
  describe('if the component does not need user initialization and has no logged-out content', () => {
    const comp = (props) => makeComponent({
      requiresUserInitialization: false,
      loggedOutChildren: null,
      ...props
    });

    it('will be empty for logged-out users', () => {
      const component = comp({ isLoggedIn: false });
      expect(component.html()).to.be.null;
    });
    it('will be empty for logged-out but initialized users', () => {
      const component = comp({ isLoggedIn: false, userIsInitialized: true })
      expect(component.html()).to.be.null;
    });
    it('will show the content when the user is logged in but not initialized', () => {
      const component = comp({ isLoggedIn: true, userIsInitialized: false })
      expect(component.html()).to.equal(fullyRenderedHtml);
    });
    it('will show the content when the user is logged in and initialized', () => {
      const component = comp({ isLoggedIn: true, userIsInitialized: true })
      expect(component.html()).to.equal(fullyRenderedHtml);
    });
  });

  describe('if the component needs user initialization and has no logged-out content', () => {
    const comp = (props) => makeComponent({
      requiresUserInitialization: true,
      loggedOutChildren: null,
      ...props
    });

    it('will be empty for logged-out users', () => {
      const component = comp({ isLoggedIn: false });
      expect(component.html()).to.be.null;
    });
    it('will be empty for logged-out but initialized users', () => {
      const component = comp({ isLoggedIn: false, userIsInitialized: true })
      expect(component.html()).to.be.null;
    });
    it('will be empty when the user is logged in but not initialized', () => {
      const component = comp({ isLoggedIn: true, userIsInitialized: false })
      expect(component.html()).to.be.null;
    });
    it('will show the content when the user is logged in and initialized', () => {
      const component = comp({ isLoggedIn: true, userIsInitialized: true })
      expect(component.html()).to.equal(fullyRenderedHtml);
    });
  });

  describe('if the component does not need initialization and has logged-out content', () => {
    const comp = (props) => makeComponent({
      requiresUserInitialization: false,
      loggedOutChildren: (<div class="child">Childrens</div>),
      ...props
    });
    const loggedOutHtml = '<div class="clz"><div class="child">Childrens</div></div>';

    it('will be empty for logged-out users', () => {
      const component = comp({ isLoggedIn: false });
      expect(component.html()).to.equal(loggedOutHtml);
    });
    it('will be empty for logged-out but initialized users', () => {
      const component = comp({ isLoggedIn: false, userIsInitialized: true })
      expect(component.html()).to.equal(loggedOutHtml);
    });
    it('will show the content when the user is logged in but not initialized', () => {
      const component = comp({ isLoggedIn: true, userIsInitialized: false })
      expect(component.html()).to.equal(fullyRenderedHtml);
    });
    it('will show the content when the user is logged in and initialized', () => {
      const component = comp({ isLoggedIn: true, userIsInitialized: true })
      expect(component.html()).to.equal(fullyRenderedHtml);
    });

  });
  
  describe('if the component does need initialization and has logged-out content', () => {
    const comp = (props) => makeComponent({
      requiresUserInitialization: true,
      loggedOutChildren: (<div class="child">Childrens</div>),
      userSettings: { thing: 'stuff' },
      ...props
    });
    const loggedOutHtml = '<div class="clz"><div class="child">Childrens</div></div>';

    it('will be empty for logged-out users', () => {
      const component = comp({ isLoggedIn: false });
      expect(component.html()).to.equal(loggedOutHtml);
    });
    it('will be empty for logged-out but initialized users', () => {
      const component = comp({ isLoggedIn: false, userIsInitialized: true })
      expect(component.html()).to.equal(loggedOutHtml);
    });
    it('will be empty when the user is logged in but not initialized', () => {
      const component = comp({ isLoggedIn: true, userIsInitialized: false })
      expect(component.html()).to.equal(loggedOutHtml);
    });
    it('will show the content when the user is logged in and initialized', () => {
      const component = comp({ isLoggedIn: true, userIsInitialized: true })
      expect(component.html()).to.equal(fullyRenderedHtml);
    });
  });
});