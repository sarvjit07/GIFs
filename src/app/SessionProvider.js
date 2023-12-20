'use client';
const React = require('react');

const { SessionProvider: Provider } = require('next-auth/react');

function SessionProvider({ children }) {
  return (
    React.createElement(Provider, null, children)
  );
}

module.exports = SessionProvider;
