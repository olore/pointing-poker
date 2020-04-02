/* eslint-disable no-unused-expressions */
// maybe install https://www.npmjs.com/package/eslint-plugin-chai-friendly

const startButton = '.is-hidden-desktop > .is-primary';
const nameInput = '[data-testid=text-input-firstName]';
const joinButton = '[data-testid=add-player] > form > .field > :nth-child(2) > .button';

let url = 'http://localhost:3000';

if (process.env.GITHUB_ACTION) {
  url = 'http://localhost:4000';
}

describe('The Home Page', function() {
  it('successfully loads', function() {
    cy.log("hey it's brian");
    cy.log(process.env);
    cy.log(process.env.GITHUB_ACTION);
    cy.log("bye it's brian");

    cy.visit(url);
  });

  it('allows starting a new game', function() {
    cy.visit(url);
    cy.get(startButton).click();
    cy.get(nameInput).type('Bobby');
    cy.get(joinButton).click();

    cy.screenshot('my-image');

    // default 4s not enough for github action? //10s either ??
    cy.get('.notification', { timeout: 30000 }).should('contain', 'You look lonely');
    expect(cy.contains('2 Points')).to.exist;
  });
});
