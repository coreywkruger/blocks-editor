# Email Builder

## Setup

```
git clone git@github.com:coreywkruger/blocks-editor.git
cd blocks-editor
npm i 
```

To build/view locally:
```
npm start
```
... then nav to http://localhost:4001

To just build:
```
npm run build
```

... build files will be added to blocks-editor-demo subdirectory

To deploy to demo site:
```
npm run deploy
```
... then nav to https://coreywkruger.github.io/blocks-editor-demo

The deploy script commits changes applied by the gulp build to the blocks-editor-demo submodule (https://coreywkruger.github.io/blocks-editor-demo) and pushes them to the gh-pages branch.