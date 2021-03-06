import React from 'react'

export default class ReformContext extends React.Component {

  static childContextTypes = {
    reformRoot: React.PropTypes.object.isRequired
  }

  static propTypes = {
    children: React.PropTypes.element.isRequired,
    themes: React.PropTypes.object.isRequired,
    validations: React.PropTypes.object.isRequired
  }

  getChildContext() {
    return {
      reformRoot: {
        getTheme: (name) => {
          const theme = this.props.themes[name]
          if (!theme) throw new Error(`No theme with name '${name}'!`)
          return theme
        },
        validationVariants: this.state.validationVariants
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      validationVariants: this.getVariants(props.validations)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.validations !== this.props.validations) {
      this.setState({validationVariants: this.getVariants(nextProps.validations)})
    }
  }

  getVariants(validations) {
    return Object.keys(validations).reduce((memo, name) => {
      const validation = {name, rule: validations[name]}
      const pascalCaseName = name[0].toUpperCase() + name.slice(1)
      memo[`is${pascalCaseName}`] = validation
      memo[`has${pascalCaseName}`] = validation

      // support old syntax, use with care, might get deprecated.
      memo[`is-${name}`] = validation
      memo[`has-${name}`] = validation
      return memo
    }, {})
  }

  render() {
    return this.props.children
  }
}
