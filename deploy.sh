npm run build; 
cd blocks-editor-demo; 
git commit -am "new build"; 
git push origin master;
git checkout gh-pages;
git merge master;
git push origin gh-pages;
