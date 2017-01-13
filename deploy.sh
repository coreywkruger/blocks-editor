REV=`git rev-parse HEAD`
cd blocks-editor-demo; 
git checkout gh-pages;
git commit -am "blocks-editor: $REV"; 
git push origin gh-pages;
