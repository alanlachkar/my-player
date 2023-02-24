/// <reference types="cypress" />
import { expect } from 'chai';

describe('Welcoming flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check charset in the document', () => {
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
  });

  it("Check tab's title", () => {
    cy.title().should('include', 'Query React App template');
  });

  it('Intercept the jsonplaceholder request', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts').as('getAllPosts');
    cy.visit('/');

    cy.wait('@getAllPosts').then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
  });

  it('Check what contain in the first post', () => {
    cy.get('#postId1').should('be.visible');
    cy.get('[data-testid="bodyId1"]').should(
      'have.text',
      'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    );
  });
});
