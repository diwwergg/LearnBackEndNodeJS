const l = console.log
const stdout = process.stdout
const stdin = process.stdin
const stderr = process.stderr
const rdl = require("readline")

class Select {
    constructor(opts = {
        question: "",
        options: [],
        answers: [],
        pointer: ">",
        color: "blue"
    }) {
        let { question, options, answers, pointer, color } = opts
        if (question.length <= 0)
            throw Error("There must be a 'question'")
        if (options.length <= 0)
            throw Error("There must be 'options'")
        if (answers.length <= 0)
            throw Error("There must be 'answers'")
        if (options.length !== answers.length)
            throw Error("'answers' and 'options' must be of the same length")
        if (pointer === undefined)
            pointer = ">"
        if (color === undefined)
            color = 'blue'
        this.question = question
        this.options = options
        this.answers = answers
        this.pointer = pointer
        this._color = color
        this.input
        this.cursorLocs = {
            x: 0,
            y: 0
        }
    }

    start() {
        return new Promise((resolve) => {
          process.stdout.write(`${this.question}\n`);
          for (let opt = 0; opt < this.options.length; opt++) {
            this.options[opt] = `${this.pointer} ${this.options[opt]}`;
            if (opt === this.options.length - 1) {
              this.input = this.options.length - 1;
              this.options[opt] += '\n';
              process.stdout.write(this.color(this.options[opt], this._color));
            } else {
              this.options[opt] += '\n';
              process.stdout.write(this.options[opt]);
            }
            this.cursorLocs.y = opt + 1;
          }
    
          process.stdin.setRawMode(true);
          process.stdin.resume();
          process.stdin.setEncoding('utf-8');
          this.hideCursor();
          process.stdin.on('data', this.pn(this, resolve));
        });
      }

    pn(self, resolve) {
    return (c) => {
      switch (c) {
        case '\u0004': // Ctrl-d
        case '\r':
        case '\n':
          return self.enter(resolve);
        case '\u0003': // Ctrl-c
          return self.ctrlc();
        case '\u001b[A':
          return self.upArrow();
        case '\u001b[B':
          return self.downArrow();
      }
    };
  }

  enter(resolve) {
    process.stdin.removeListener('data', this.pn);
    process.stdin.setRawMode(false);
    process.stdin.pause();
    this.showCursor();
    rdl.cursorTo(process.stdout, 0, this.options.length + 1);
    const selectedAnswer = this.answers[this.input];
    console.log(`\nYou selected: ${selectedAnswer}`);
    resolve(selectedAnswer);
  }
    ctrlc() {
        stdin.removeListener('data', this.pn)
        stdin.setRawMode(false)
        stdin.pause()
        this.showCursor()
    }

    upArrow() {
        let y = this.cursorLocs.y
        rdl.cursorTo(stdout, 0, y)
        stdout.write(this.options[y - 1])
            //l(y)
            //l(opts[y - 1])
        if (this.cursorLocs.y === 1) {
            this.cursorLocs.y = this.options.length
        } else {
            this.cursorLocs.y--
        }
        y = this.cursorLocs.y
        rdl.cursorTo(stdout, 0, y)
        stdout.write(this.color(this.options[y - 1], this._color))
        this.input = y - 1
    }

    downArrow() {
        let y = this.cursorLocs.y
        rdl.cursorTo(stdout, 0, y)
        stdout.write(this.options[y - 1])
            //l(y)
            //l(opts[y - 1])
        if (this.cursorLocs.y === this.options.length) {
            this.cursorLocs.y = 1
        } else {
            this.cursorLocs.y++
        }
        y = this.cursorLocs.y
        rdl.cursorTo(stdout, 0, y)
        stdout.write(this.color(this.options[y - 1], this._color))
        this.input = y - 1
    }
    hideCursor() {
        stdout.write("\x1B[?25l")
    }

    showCursor() {
        stdout.write("\x1B[?25h")
    }

    color(str, colorName = "yellow") {
        const colors = {
            "yellow": [33, 89],
            "blue": [34, 89],
            "green": [32, 89],
            "cyan": [35, 89],
            "red": [31, 89],
            "magenta": [36, 89]
        }
        const _color = colors[colorName]
        const start = "\x1b[" + _color[0] + "m"
        const stop = "\x1b[" + _color[1] + "m\x1b[0m"
        return start + str + stop
    }
}

const example = new Select({
    question: "What is your favorite color?",
    options: ["Red", "Green", "Blue", "Yellow", "Cyan", "Magenta"],
    answers: ["red", "green", "blue", "yellow", "cyan", "magenta"],
    pointer: ">>",
    color: "blue"
});

// clear terminal before starting
stdout.write("\x1Bc")


module.exports = Select // export the class