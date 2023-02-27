/// <reference types="cypress" />
import { expect } from 'chai';

describe('HomePage flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check charset in the document', () => {
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
  });

  it("Check tab's title", () => {
    cy.title().should('include', 'My Player');
  });

  it('Intercept the google API request', () => {
    cy.intercept(
      'GET',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    ).as('getBigBuckBunnyMovie');
    cy.visit('/');
    cy.get('[data-testid="card_1"]').should('be.visible');
    cy.get('[data-testid="card_1"]').click();

    cy.wait('@getBigBuckBunnyMovie').then(({ response }) => {
      expect(response.statusCode).to.eq(206);
    });
  });

  it('Check what contain in the first card', () => {
    cy.get('[data-testid="card_1"]').should('be.visible');
    cy.get('[data-testid="card_1_title"]').should('have.text', 'Big Buck Bunny');
  });
});
