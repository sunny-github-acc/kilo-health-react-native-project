

# Kilo.Health React/JSX Style Guide Doc

## What is this guide about?

This style guide is mostly based on the standards that are currently prevalent in JavaScript 
and are used in Kilo.health React/React-Native development process. This document should help and guide
new developers understand the React code style and best practices we adopt.

## Table of Contents

  1. [Intro](#intro)
  1. [Basic Rules](#basic-rules)
  1. [Project Structure](#project-structure)
  1. [Functional vs Class-Component](#functional-vs-class-component)
  1. [Naming](#naming)
  1. [Declaration](#declaration)
  1. [Alignment](#alignment)
  1. [Quotes](#quotes)
  1. [Spacing](#spacing)
  1. [Props](#props)
  1. [Refs](#refs)
  1. [Parentheses](#parentheses)
  1. [Tags](#tags)
  1. [Methods](#methods)
  1. [Ordering](#ordering)
  
## Intro

### Why do we need this document?

> Here’s the simple truth: you can’t innovate on products without first innovating the way you build them.

> Working in software development and design, we are often required to ship one-off solutions. 
Sometimes we’re working within time constraints and sometimes we just haven’t yet agreed upon a path forward. 
These one-off solutions aren’t inherently bad, but if they aren’t built upon a solid foundation, we eventually
find ourselves having to pay back accrued technical and design debts.

> A unified design and code system is essential to building better and faster:
>  - **better** because a cohesive experience is more easily understood by our users
>  - **faster** because it gives us a common language to work with.
  
## Basic Rules

- Always use JSX syntax.
- Do not use React.createElement unless you’re initializing the app from a file that is not JSX.
- Only include one React component per file.
  - However, multiple Stateless, or Pure, Components are allowed per file
- JSX component should always have it's name declared [react/display-name](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md)
  - There is one exception when we are using `React.forwardRef`.

## Project Structure

All react-native projects in Kilo.Health should have this upper level structure:

```
src/
├── assets
├── components
├── containers
├── state
├── styles
├── utils
├── App.js
├── api.js
├── config.js
└── sentry/firebase.js (global level SDK's third party api integrations)
```

This structure helps us better understand what components we use and how they are linked together.
It also helps to modularise them more efficiently and reuse iin other projects. We will go trough
all of the subdirectories below.

### `assets/`

```
assets/
├── fonts
├── images
└── etc ...
```

### `components/`

One of many goals for Mobile team in Kilo.Health is to have good and reusable components.
Inside `components` we have subdirectories which are categorized by component's function.
If component is unique and cant be put inside one of subcategories it should be added inside
`other` components subdirectory (eg Calendar, Header, Footer). If we notice that we have a 
few different types of header components then they can be extracted to their subdirectory
`headers`, inside `components` directory. `index.js` file should be used to export all
the components inside `components` directory.

```
components/
├── buttons
├── cards
├── modals
├── inputs
├── lists
├── items
├── texts
├── icons
├── widgets
├── wrappers
├── other
├── ...
└── index.js
```

### `containers/`

Containers could also be called views or screens. In this subdirectory we have all of our user facing views,
which are categorized by user flow. `Routes.js` file contains navigation logic which describes how and when
user can navigate to particular screen. Every subdirectory (eg <SomeName>Flow) should have all the views
related with that flow and single `index.js` file which is used as a **single export source**.

```
components/
├── HomeFeed/
|   ├── LoginView.js
|   ├── RegistrationView.js
|   └── index.js
├── LoginFlow
├── ProfileFlow
├── ...
└── Routes.js
```

### `state/`

State directory is dedicated to app level state and business logic which in best case scenario
should be reusable across projects. In Kilo.Health we manage our state using redux and redux-saga.

```
state/
├── app/
|   ├── AppActions.js
|   ├── AppConstants.js
|   ├── AppStateSaga.js
|   ├── ...
|   └── AppReducer.js
├── ...
├── payments
├── user
├── actions.js
├── constants.js
├── reducers.js
├── sagas.js
└── store.js
```

> `actions.js` file is used as a **single export source** for all redux actions.
This exported object should be used all across application, explicitly imported actions
are undesirable and gets messy when something changes.

```jsx
// good
// actions.js

import { appActions } from './app/AppActions';
import { userActions } from './user/UserActions';
// ...

export const actions = {
  app: appActions,
  user: userActions,
  // ...
};
```

```jsx
// bad
// SomeComponent.js

import { userActions } from '../../state/user/UserActions';

// ...

const mapDisptachToProps = {
  login: userActions.login
}
// ...
```

> `constants.js` file is used as a **single export source** for all redux action constants.
This exported object should be used all across application.

```jsx
// good
// constants.js

import { uiConstants } from './ui/UiConstants';
import { appConstants } from './app/AppConstants';
// ...

export const constants = {
  ui: uiConstants,
  app: appConstants,
  // ...
};
```

> `sgas.js` file is used for running all generator functions (sagas). This acts as a rootSaga where 
all sagas inside state subdirectories should be imported and run after redux store is created.

```jsx
function* rootSaga() {
  yield all([
    saga1(),
    ...
  ]);
}
```

### `styles/`

This directory is supposed to hold all of our global styles which are used all across the app.
Usual suspects found in this directory are `colors.js`, `fonts.js`, `otherApplicableStyles.js`.
If application supports more than one theme this directory should take following structure:

 ```
 styles/
 ├── default/
 |   ├── fonts.js
 |   ├── colors.js
 |   ├── ...
 |   ├── theme.js
 |   └── index.js
 ├── dark/
 |   ├── fonts.js
 |   ├── colors.js
 |   ├── ...
 |   ├── theme.js
 |   └── index.js
 └── index.js
 ```
 
> `theme.js` should hold all variable styles for different components and this file should be used
inside component or container files.

```jsx
// theme.js
export const defaultTheme = {
  DefaultButton: {
    contianer: { ... },
    label: { ... },
    // ...
  }

}
```

```jsx
// DefaultButton.js
// ...
import { themes } from '../../styles'

const styles = themes['dark']['DefaultButton'];

export const DefaultButton = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{text}</Text>
    </View>
  );
}
```

> This approach could be also used in case when we need to change app theme on the fly,
we can add this line `const styles = themes['dark']['DefaultButton']` inside component
render method and retrieve styles during the render process.

### `utils/`

This directory should be used for all util functions which should be used across teh app.
Majority of these functions are pure functions and should be tested. If we have different 
functions doing the same thing then these functions should be extracted and unified into
one tested functions inside utils directory.

**Usual suspects:** 
 - `validators.js`
 - `datetime.js`
 - `formatters.js`
 - ...
 
> IMPORTANT: All complex mapping or filtering logic from components, containers or state directories should 
be extracted and placed here (inside `utils`). Exported function should have it's
test suite to ensure that it is working properly.

## Functional vs Class-Component

### When to use which component

Functional components are preferred if project's `react` or `react-native` module supports React hooks.

```jsx
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

If component has complex state and/or props structure one should consider using Class-Component.
Class-Component namely `React.PureComponent` or `React.Component` have `shouldComponentUpdate`
method implemented and it ensures less renders by checking if something in state or props have changed.

Main difference between PureComponent and Component is that PureComponent only preforms shallow equality
check, so if your component state or props are complex objects `React.Component` should be considered.

> IMPORTANT: Props passed to `React.FC` component shouldn't contain any unnecessary props which could
lead to unnecessary renders.

```jsx
// bad
const userObject = {
  name: 'Name',
  surname: 'Surname',
  settings: { ... },
}

function Example = () => (
  <>
    <FunctionalComponent {...userObject}/>
  </>
);
```

```jsx
// good
const userObject = {
  name: 'Name',
  surname: 'Surname',
  settings: { ... },
}

function Example = () => (
  <>
    <FunctionalComponent name={userObject.name} surname={userObject.surname}/>
  </>
);
```

## Naming

### Filename and filename extension

  - **File extension:**
    - Typescript project:
      - If file contains only TS code `.ts` extension should be used
      - If file contains JSX code `.tsx` extension should be used
    - JavaScript project:
      - All files should have `.js` extension
      
  - **Filenames:**
    - `components/`, `containers/` and `state/<sub-dir>/` files should be named in PascalCase (e.g. `DefaultButton.js`)
    - For files inside `utils/` use camelCase (e.g. `validations.js` or `userMappers.js`)
    - HOC (Higher-order Component) use camelCase (e.g. `withNetworkState.js` or `withAuth.js`)
    
  - **Component naming:**
    - Use the filename as the component name. For example, `DefaultButton.js` should have a reference name of `DefaultButton`
    - Connected components should be exported and named in following way:
    
    ```jsx
    // Functional component export as named export
    const DefaultButtonComponent = props => <Button {...props} />;
    export const DefaultButton = connect(mapStateToProps, mapDispatchToProps)(DefaultButtonComponent);
    
    // Class-Component export as default export
    class AnimatedText extends React.Component { ... }
    export default connect(mapStateToProps, mapDispatchToProps)(AnimatedText);
    ```

  - **Props Naming:** Avoid using DOM component prop names for different purposes.
    > Why? People expect props like `style` and `className` to mean one specific thing. Varying this API for a 
    subset of your app makes the code less readable and less maintainable, and may cause bugs.

    ```jsx
    // bad
    <MyComponent style="fancy" />

    // bad
    <MyComponent className="fancy" />

    // good
    <MyComponent variant="fancy" />
    ```
    
  - **Ref naming:** Always use postfix Ref when naming component reference.
  
  ```jsx
  // bad
  class Foo extends React.Component {
    input = React.createRef();
    //...
  }
  
  // good
    class Foo extends React.Component {
      inputRef = React.createRef();
      //...
    }
  ```

## Declaration

Correct component declaration is crucial in development process. 
Correct declaration and proper component naming helps to find related
code much quicker and makes much more sense when it has unique/single
name across project.

```jsx
// bad
export default class extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

export default () => {
  return <div>Hello {this.props.name}</div>;
}

// good 
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

export const Hello = () => {
  return <div>Hello {this.props.name}</div>;
}

// exception
const TextInput = React.forwardRef((props, ref) => {
  return <TextInput {...props} ref={ref}/>;
});
```

## Alignment

Follow these alignment styles for JSX syntax:

```jsx
// bad
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />

// good
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>

// if props fit in one line then keep it on the same line
<Foo bar="bar" />

// children get indented normally
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
  <Quux />
</Foo>

// bad
{showButton &&
  <Button />
}

// bad
{
  showButton &&
    <Button />
}

// good
{showButton && (
  <Button />
)}

// good
{showButton && <Button />}
```

## Quotes

Always use double quotes (`"`) for JSX attributes, but single quotes (`'`) for all other JS.

> Why? Regular HTML attributes also typically use double quotes instead of single, so JSX attributes mirror this convention.

```jsx
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

// bad
<Foo style={{ left: "20px" }} />

// good
<Foo style={{ left: '20px' }} />
```

## Spacing

Always include a single space in your self-closing tag.

```jsx
// bad
<Foo/>

// very bad
<Foo                 />

// bad
<Foo
 />

// good
<Foo />
```

Do not pad JSX curly braces with spaces.

```jsx
// bad
<Foo bar={ baz } />

// good
<Foo bar={baz} />
```

## Props

Always destructure `this.props` and `this.state` inside Class-Component 
it ensures better readability and is shorter.

```jsx
// bad
render() {
  return (
    <View>
      <TextInput
        value={this.state.value}
        onChangeText={this.props.onChage}
      />
    </View>
  );
}

// good
render() {
  const { value } = this.state;
  const { onChange } = this.props;
  
  return (
    <View>
      <TextInput value={value} onChangeText={onChage} />
    </View>
  );
}
```

Always use camelCase for prop names.

```jsx
// bad
<Foo
  UserName="hello"
  phone_number={12345678}
/>

// good
<Foo
  userName="hello"
  phoneNumber={12345678}
/>
```

Due to better readability we strongly encourage to explicitly
pass `true` or `false` boolean value to boolean prop.

```jsx
// if prop name is not trivial enough developer should spend more time to deduct what this prop does
<Foo
  hidden
/>

<Foo hidden />

// better readability
<Foo
  hidden={true}
/>
```

Avoid using an array index as `key` prop, prefer a stable ID

> Why? Not using a stable ID [is an anti-pattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) because it can negatively impact performance and cause issues with component state.

We don’t recommend using indexes for keys if the order of items may change.

```jsx
// bad
{todos.map((todo, index) =>
  <Todo
    {...todo}
    key={index}
  />
)}

// good
{todos.map(todo => (
  <Todo
    {...todo}
    key={todo.id}
  />
))}
```

Always define explicit `defaultProps` for all non-required props. 

> Why? propTypes are a form of documentation, and providing defaultProps means the reader of your
code doesn’t have to assume as much. In addition, it can mean that your code can omit certain type checks.

```jsx
// bad
function SFC({ foo, bar, children }) {
  return <div>{foo}{bar}{children}</div>;
}
SFC.propTypes = {
  foo: PropTypes.number.isRequired,
  bar: PropTypes.string,
  children: PropTypes.node,
};

// good
function SFC({ foo, bar, children }) {
  return <div>{foo}{bar}{children}</div>;
}
SFC.propTypes = {
  foo: PropTypes.number.isRequired,
  bar: PropTypes.string,
  children: PropTypes.node,
};
SFC.defaultProps = {
  bar: '',
  children: null,
};
```

> Second good thing is that when you have your `defualtProps` you dont need to default in other random code places

```jsx
// bad
class SomeComponent extends React.Component {
  render() {
    const {
      color = 'red',
      children,
    } = this.props;
    return <View style={{ backgroundColor: color }}>{children}</View>;
  }
}

// good
class SomeComponent extends React.Component {
  static defaultProps = {
    color: 'red',
  };
  
  render() {
    const {
      color,
      children,
    } = this.props;
    return <View style={{ backgroundColor: color }}>{children}</View>;
  }
}
```

Use spread props sparingly.

> Why? Otherwise you’re more likely to pass unnecessary props down to components.
It also creates a lot of overhead for other developers to understand which props
are relevant and which ones are just excess props travelling down the tree for no reason.

> NOTE: you can always use lodash to `pick` relevant or `omit` irrelevant props

```jsx
// bad
render() {
  const { irrelevantProp, ...relevantProps } = this.props;
  return <WrappedComponent {...this.props} />
}

// good
render() {
  const { irrelevantProp, ...relevantProps } = this.props;
  return <WrappedComponent {...relevantProps} />
}
```

## Refs

We strongly encourage the usage of `React.createRef()` API to create component reference [(introduced since React 16.3)](https://reactjs.org/docs/refs-and-the-dom.html).

> There are instances when `React.createRef()` wont work, then use reference callback.

```jsx
// bad
<Foo ref="myRef" />

// good
class Foo extends React.Component {
  inputRef = React.createRef();

  render() {
    return (
      <View>
        <TextInput ref={this.inputRef}/>
      </View>
    );
  }
}

// When React.createRef iis not workinig
class Foo extends React.Component {
  inputRef = null;

  render() {
    return (
      <View>
        <TextInput ref={r => this.inputRef = r}/>
      </View>
    );
  }
}
```

Always check if reference is defined when tying to access reference method.

```jsx
// bad
class Foo extends React.Component {
  inputRef = React.createRef();

  render() {
    return (
      <View>
        <TextInput ref={this.inputRef} />
        <Button onPress={this.blur} />
      </View>
    );
  }
  
  blur = () => {
    this.inputRef.current.blur();
  }
}

// good
class Foo extends React.Component {
  inputRef = React.createRef();

  render() {
    return (
      <View>
        <TextInput ref={this.inputRef} />
        <Button onPress={this.blur} />
      </View>
    );
  }
  
  blur = () => {
    if (this.inputRef.current && typeof this.inputRef.current.blur === 'function') {
      this.inputRef.current.blur();
    }
  }
}
```

## Parentheses

Wrap JSX tags in parentheses when they span more than one line.

```jsx
// bad
render() {
  return <MyComponent variant="long body" foo="bar">
           <MyChild />
         </MyComponent>;
}

// good
render() {
  return (
    <MyComponent variant="long body" foo="bar">
      <MyChild />
    </MyComponent>
  );
}

// good, when single line
render() {
  const body = <div>hello</div>;
  return <MyComponent>{body}</MyComponent>;
}
```

## Tags

Always self-close tags that have no children.

```jsx
// bad
<Foo variant="stuff"></Foo>

// good
<Foo variant="stuff" />
```

If your component has multi-line properties, close its tag on a new line.

```jsx
// bad
<Foo
  bar="bar"
  baz="baz" />

// good
<Foo
  bar="bar"
  baz="baz"
/>
```

## Methods

We encourage to use arrow functions inside Class-Components for custom methods.
It auto-binds functions to class scope, and it helps prevent errors related with
`this` when functions is used as callback. Arrow functions inside Class-Component 
doesnt require to bind them inside constructor. All thought we encourage arrow functions,
their usage in inline JSX is suboptimal.

> NOTE: React lifecycle methods could be written either way

```jsx
// bad
class Example extends React.Component {
  state = {
    text: '',
  };
  
  onChange = fieldName => value => {
    this.setState({ [fieldName]: value });
  }
  
  render() {
    const { text } = this.state;
    return (
      <View>
        <TextInput
          value={text}
          onChangeText={value => this.onChage('text')(value)}
        />
      </View>
    );
  }
}

// good
class Example extends React.Component {
  onPress = () => {
    console.log('Hello world');
  }
  
  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Text>Print something</Text>
      </TouchableOpacity>
    );
  }
}

// very good
class Example extends React.Component {
  state = {
    text: '',
  };
  
  onChange = fieldName => value => {
    this.setState({ [fieldName]: value });
  }
  
  render() {
    const { text } = this.props;
    return (
      <View>
        <TextInput
          value={text}
          onChangeText={this.onChage('text')}
        />
      </View>
    );
  }
}
```

Do not use underscore prefix for internal methods of a React component.

> Why? Underscore prefixes are sometimes used as a convention in other languages to denote privacy. But, unlike those languages, there is no native support for privacy in JavaScript, everything is public. Regardless of your intentions, adding underscore prefixes to your properties does not actually make them private, and any property (underscore-prefixed or not) should be treated as being public. See issues [#1024](https://github.com/airbnb/javascript/issues/1024), and [#490](https://github.com/airbnb/javascript/issues/490) for a more in-depth discussion.

```jsx
// bad
React.createClass({
  _onClickSubmit = () => {
    // do stuff
  },

  // other stuff
});

// good
class extends React.Component {
  onClickSubmit = () => {
    // do stuff
  }

  // other stuff
}
```

Be sure to return a value in your `render` methods.

```jsx
// bad
render() {
  (<div />);
}

// good
render() {
  return (<div />);
}
```

## Ordering

Method ordering inside Class-Component is important to quickly see what component does 

Ordering for `React.Component`:

  1.  static variables
  1.  instance variables
  1.  optional `static` methods
  1. `constructor`
  1. `componentDidMount`
  1. `shouldComponentUpdate`
  1. `componentDidUpdate`
  1. `componentWillUnmount`
  1. *optional render methods* like `renderNavigation()` or `renderProfilePicture()`
  1. *clickHandlers or eventHandlers* like `onClickSubmit()` or `onChangeDescription()`
  1. *getter methods for `render`* like `getSelectReason()` or `getFooterContent()`
  1. `render`

How to define `propTypes`, `defaultProps`, `contextTypes`, etc...

```jsx
// Class-Component
import React from 'react';
import PropTypes from 'prop-types';

class Link extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string,
  };
  
  static defaultProps = {
    text: 'Hello World',
  };
  
  static methodsAreOk() {
    return true;
  }

  render() {
    return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>;
  }
}

export default Link;

// Functional component
import React from 'react';
import PropTypes from 'prop-types';

const Link = props => {
  return <a href={props.url} data-id={props.id}>{props.text}</a>;
}

Link.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
};

Link.defaultProps = {
  text: 'Hello World',
};

export default Link;
```

**[⬆ back to top](#table-of-contents)**
