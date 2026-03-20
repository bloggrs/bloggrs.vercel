# bloggrs.playground

`bloggrs.playground` is the guided documentation and blueprint workspace for the Bloggrs stack.

It is designed to live inside `bloggrs.platform` while still running standalone during local development.

## What It Does

- explains the Bloggrs product model in customer-facing language
- lets teams compose a draft from typed blueprints and reusable blocks
- produces request-ready payloads for `bloggrs.api.deprecated`
- hands drafts off to `bloggrs.scratch` through the platform bridge

## Shell Integration

When embedded by `bloggrs.platform`, Playground expects shell context for:

- selected product
- active route
- active app
- theme
- environment
- user level
- authenticated session

It sends typed actions back to the shell for:

- `open-builder`
- `apply-blueprint`
- `create-draft`
- `view-api-payload`
- `switch-route`

## Local Development

```bash
npm install
npm run dev
```

Default dev URL: `http://localhost:5173`

## Build

```bash
npm run build
```

## Related Projects

- `bloggrs.platform`: permanent shell, iframe host, navigation, session, environment
- `bloggrs.scratch`: API-backed execution workspace
- `bloggrs.sdk`: typed bridge and published runtime SDK
- `bloggrs.api.deprecated`: generic product, document, workspace, and publication API
