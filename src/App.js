import React from 'react'
import './App.css'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0
    }
  }

  // Once the component is mounted, set the movable box at (0, 0) and start listening to key events
  componentDidMount() {
    this.setMovalbleBox()
    this.handleKeyEvents()
  }

  // Once the component is updated, i.e., arrow key is pressed, update the (x, y) of the movable box
  componentDidUpdate() {
    this.setMovalbleBox()
  }

  // set the position of movable box according to updated (x, y)
  setMovalbleBox() {
    let contentBox = this.refs.contentBox
    let context = contentBox.getContext('2d')
    context.fillStyle = '#EB4769'
    context.fillRect(this.state.x, this.state.y, 10, 10)
    context.strokeText(
      '(' + this.state.x + ', ' + this.state.y + ')',
      this.state.x + 50 >= contentBox.width ? this.state.x - 50 : this.state.x + 12,
      this.state.y + 8,
      50
    )
  }

  // listen to the key events
  handleKeyEvents() {
    document.body.onkeydown = event => {
      let contentBox = this.refs.contentBox
      let x = this.state.x
      let y = this.state.y
      switch (event.key) {
        case 'ArrowLeft':
          x -= 10
          break
        case 'ArrowRight':
          x += 10
          break
        case 'ArrowUp':
          y -= 10
          break
        case 'ArrowDown':
          y += 10
          break
        default:
          return // arrow key is not pressed
      }

      // clear the current movable box
      contentBox.getContext('2d').clearRect(0, 0, contentBox.width, contentBox.height)

      // update the (x, y) of the movable box but keep it within the content box
      this.setState({
        x: x <= 0 ? 0 : (x >= contentBox.width ? this.state.x : x),
        y: y <= 0 ? 0 : (y >= contentBox.height ? this.state.y : y)
      })
    }
  }

  render() {
    return (
      <canvas className='contentBox' ref='contentBox' />
    )
  }
}
