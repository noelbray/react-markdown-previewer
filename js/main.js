// marked.setOptions({
//   gfm: true, breaks: true
// });

 // This code is really raw, non-refactored. I was testing a lot of things out trying to get it to work the way I wanted to and to see etc. 

let sectionStyle = {
  border: "2px solid yellow"
  // width: "100%",
  // "@media screen and (max-width: 768px)": {
  //  height: "100%" 
  // }
}

const PLACEHOLDER = `Input something in the Markdown Editor and see the output in the Markdown Previewer.

Blockquote with italics:
A greater than symbol and space followed by a word or phrase makes a blockquote and just put an underscore at the beginning of and end of the word or phrase:
> _Even if we disagree with each other over anything, we should still be able to work together, talk to each other, and accomplish things._

I used [Answers In Genesis] as a link example because I have found AIG to be a very interesting website. I have to admit: there explanation between historical science and observational science seems very sound as well as their logic, their explanation for why people vary in skin color, media concerning worldviews and preconditions of intelligibility, and etc. If I am truly opened minded, I should watch more of their videos and read more of their articles, and explore their website further.

Oh, to get a link just type a word or phrase within brackets [like so] and immediately follow it with the url surrounded by paretheses or type [word or phrase] and at the end of this document after pressing enter, return type type the same word or phrase again within the brackets with a colon immediately following it, a space, a the url. "[word or phrase]: https://www.wordorphrase.com" to make it create a link with the same text as the word or phrase within the brackets, but if you only want the url to show as the link, just type the url.

# One number sign, hash, symbol with a space after it makes H1
## Two number signs, hashes back to back with a space after them make an H2 
### "### H3" = H3
html element between 2 backticks makes a line of code:  
${"`<p>I hope you have a great day. Smile and keep smiling especially if you've got a place to live, food to eat, and running water to drink and take a shower.</p>`"}

A code block is created with three backticks on the before and the line after the code block:

${"//this is a block of code (multiline code)\n```\nfunction fun() {\n const phrase = code me something to do; \nreturn phrase || undefined;\n}\n```"}

Make **bold** text by put a pair of asterisks, star symbols, characters "**"

Hyphen and space followed with a word or phrase makes list:

- list item
  - sub-list item
  - sub-list item
    - sub-sub-list item
- list item

Embed an image by using the exclamation mark immediately followed by the alt text within brackets followed by the url in paretheses.

![React Logo w/ Text](https://goo.gl/Umyytc)

[Answers In Genesis]: https://www.answersingenesis.org/
  `

// Note to me: remember to put the script links within this JS panel's settings
// Parent Component: 
class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: PLACEHOLDER,
      // placeHolder: PLACEHOLDER
      expandElement: "",
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.setInnerHTML = this.setInnerHTML.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  onChangeHandler(event) {
    this.setState(
      // event.target.value !== "" ? 
      // {input:marked(event.target.value)} : 
      // {input: PLACEHOLDER}
      {input: event.target.value}
    )
  }
  setInnerHTML(inputHTML) {
    return {__html: inputHTML};
    // {__html: 'First &middot; Second'}
  }
  handleClick(e) {
    const parentE = e.target.parentElement.parentElement;
    const editorSection = document.querySelector("#editor-section");
    const previewSection = document.querySelector("#preview-section");
    // const reactRoot = document.querySelector("#reactRoot");
    e.target.innerText === "Expand" ? 
      e.target.innerText = "Minimize" : 
      e.target.innerText = "Expand";
    // this.state.expandElement === "" ? 
    //   this.setState({expandElement: e.target.parentElement.parentElement.id}) :
    // this.setState({expandElement: ""});
    // this.setState(
    // //   state => {
    // //   return (this.state.expandElement === "") ?
    // //     // {expandElement: e.target.parentElement.parentElement.id} :
    // //     // For some reason the line of code just above wont work, maybe it's a bug.    
    // //     {expandElement: parentE} :
    // //     {expandElement: ""}
    // // }
    //   // This code just below works but I wont to make sure I have the most current value of state so I used the second form of setState which accepts a function.
    //   this.state.expandElement === "" ? {expandElement: e.target.parentElement.parentElement.id} : {expandElement: ""}
    // );
    // But this code works:     
    // e.target.parentElement.parentElement.style.width = "100%";
    // parentE.style.width = "100%";
    
    // rename the class test to expand and change it's declarations:
    // add new rule sets for each for test @media rule
   // e.target.parentElement.parentElement.classList.toggle("test");
    // e.target.parentElement.parentElement.id === editorSection.id && previewSection.classList.toggle("hide"); 
    // e.target.parentElement.parentElement.id === previewSection.id && editorSection.classList.toggle("hide");
   if (parentE.id === editorSection.id) {
    previewSection.classList.toggle("hide");
    parentE.classList.toggle("expand");
   }
   if (parentE.id === previewSection.id) {
     editorSection.classList.toggle("hide");
     parentE.classList.toggle("expand");
   } 
  }
  render() {
    // if (this.state.expandElement === "editor-section") {
    //   return (
    //     <>
    //     <TextArea 
    //       onChangeHandler={this.onChangeHandler}
    //       handleClick={this.handleClick}
    //       // placeholder={PLACEHOLDER}
    //       value={this.state.input}
    //       />
    //     </>
    //   )
    // } 
    // if (this.state.expandElement === "preview-section") {
    //   return (
    //     <>
    //       <Preview 
    //         stateInput={this.state.input}
    //         setInnerHTML={this.setInnerHTML}
    //         handleClick={this.handleClick}
    //         />
    //     </>
    //   )
    // }
    if (this.state.expandElement === "editor-section") {
      return (
        <>
          <TextArea 
            expandElement={this.state.expandElement}
            onChangeHandler={this.onChangeHandler}
            handleClick={this.handleClick}
            // placeholder={PLACEHOLDER}
            value={this.state.input}
            />
         </>
      )
    }
    else if (this.state.expandElement === "preview-section") {
      return (
        <>
          <Preview 
          expandElement={this.state.expandElement}
          stateInput={this.state.input}
          setInnerHTML={this.setInnerHTML}
          handleClick={this.handleClick}
          />
        </>
      )
    } else {
    return (
      <>
        <TextArea 
          expandElement={this.state.expandElement}
          onChangeHandler={this.onChangeHandler}
          handleClick={this.handleClick}
          // placeholder={PLACEHOLDER}
          value={this.state.input}
          />
        <Preview 
          expandElement={this.state.expandElement}
          stateInput={this.state.input}
          setInnerHTML={this.setInnerHTML}
          handleClick={this.handleClick}
          />
      </>
    )}
  }
}

// Children Components: 
function TextArea(props) {
  
  // return (props.expandElement === "" || props.expandElement === "editor-section") ? (
  //   <section id="editor-section">
  //     <h1 class="h1">
  //       Markdown Editor
  //       <span 
  //         className="change-size"
  //         onClick={props.handleClick}
  //         >Expand</span>
  //     </h1>
  //     <textarea 
  //       id="editor"
  //       onChange={props.onChangeHandler}
  //       // placeholder={props.placeholder}
  //       // value={PLACEHOLDER}
  //       value={props.value}
  //       ></textarea>
  //    </section>
  // ) : null;
  // const styleSection = ; 
        
  return (
    <section 
      id="editor-section" 
      /*style={props.expandElement === "editor-section" ? {border: "2px solid blue"} : {}}*/
      // style={props.expandElement === "editor-section" ? {sectionStyle} : null}
      >
      <h1 class="h1">
        Markdown Editor
        <span 
          className="change-size"
          onClick={props.handleClick}
          >Expand</span>
      </h1>
      <textarea 
        id="editor"
        onChange={props.onChangeHandler}
        // placeholder={props.placeholder}
        // value={PLACEHOLDER}
        value={props.value}
        ></textarea>
     </section>
  ); 
}

function Preview(props) {
   // return (props.expandElement === "" || props.expandElement === "preview-section") ? (
   //   <section id="preview-section">
   //     <h1 class="h1">
   //       Markdown Previewer
   //       <span 
   //         className="change-size"
   //         onClick={props.handleClick}
   //         >Expand</span>
   //     </h1>
   //     <div 
   //       id="preview"
   //       /* test1:
   //       dangerouslySetInnerHTML={props.setInnerHTML("<ul><li>test</li><li>test2</li></ul>")}*/
   //       // test2: 
   //       // dangerouslySetInnerHTML={props.setInnerHTML(`${props.stateInput}`)}
   //       dangerouslySetInnerHTML={props.setInnerHTML(marked(props.stateInput, {gfm: true, breaks: true}))}
   //     ></div>
   //    </section>
   //   ) : null;
    
  return (
     <section 
       id="preview-section" 
       /* style={props.expandElement === "preview-section" ? {border: "1px solid blue"} : {}}*/
       // style={props.expandElement === "preview-section" ? {sectionStyle} : null}
       >
       <h1 class="h1">
         Markdown Previewer
         <span 
           className="change-size"
           onClick={props.handleClick}
           >Expand</span>
       </h1>
       <div 
         id="preview"
         /* test1:
         dangerouslySetInnerHTML={props.setInnerHTML("<ul><li>test</li><li>test2</li></ul>")}*/
         // test2: 
         // dangerouslySetInnerHTML={props.setInnerHTML(`${props.stateInput}`)}
         dangerouslySetInnerHTML={props.setInnerHTML(marked(props.stateInput, {gfm: true, breaks: true}))}
       ></div>
      </section>
     ) 
    
     // {marked(props.stateInput)}
     // https://cdn.jsdelivr.net/npm/marked/marked.min.js
     // input HTML test: <ul><li>test</li><li>test2</li></ul> // if you past this into test1 or test2 within the template literal, backticks, it will produce a list. 
     // {props.stateInput}
     // <textarea 
     // id="preview"
     // value={props.stateInput}></textarea>
}

// Render To The DOM
ReactDOM.render(
  <MarkdownPreviewer/>,
  document.getElementById("reactRoot")); 

