Setup:
1. Make an account with yFiles
2. Download yFilesforHTML
    - I've extracted mine to the Desktop

In terminal (creating npm file for existing project):
sudo npm i -g yfiles-dev-suite

npm run (automatically opens web browser)

Load data into PuppyGraph at localhost:8081
- I just used the sample schema

Go to:
https://www.yworks.com/app-generator/

And select the gremlin modern template. If done correctly, hovering above Gremlin Loader should show the sample data. 
- For the most part, Gremlin Modern sets everything up perfectly. However, age is an int, so age[0] results in undefined. In label configuration:

undef: name: ' + name[0] + '\n   age: ' + age[0]
fixed: name: ' + name[0] + '\n   age: ' + age

