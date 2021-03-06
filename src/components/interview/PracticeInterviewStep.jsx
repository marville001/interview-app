/* eslint-env browser */
import React from "react";
import * as questions from "../../questions.json";

const videoType = "video/webm";

export default class PracticeInterviewStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      current: {},
      practice: [
        {
          id: "0",
          question: "What did you do before this?",
          duration: 3,
        },
      ],
      remaining: 0,
      index: 0,
      end: false,
      checked: false,
    };
  }

  async componentDidMount() {
    const { practice } = questions;
    this.setState({ practice });
    this.setState({ checked: false });

    const quiz = practice?.find((p) => p.id === this.state.index.toString());
    this.setState({
      current: quiz,
    });
    this.updateRemaining(quiz.duration);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      //   audio: true,
    });
    // show it to user
    this.video.srcObject = stream;
    this.video.play();
    // init recording
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: videoType,
    });
    // init data storage for video chunks
    this.chunks = [];
    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
  }

  updateRemaining = (duration) => {
    const total = duration * 60;
    this.setState({ remaining: total });
    setInterval(() => {
      this.state.remaining > 0 &&
        this.setState({
          remaining: this.state.remaining - 1,
        });
    }, 1000);
  };

  handleNextQuestion = () => {
    this.setState({ checked: false });
    const { practice } = this.state;
    const length = practice.length;
    if (length - 1 === this.state.index + 1) {
      this.setState({ end: true });
    }
    if (this.state.index + 1 <= length) {
      this.setState({ index: this.state.index + 1 });
      const quiz = practice?.find(
        (p) => p.id === (this.state.index + 1).toString()
      );
      this.updateRemaining(quiz.duration);
      this.setState({
        current: quiz,
      });
    }
  };

  render() {
    const { current, remaining, practice, index, end } = this.state;
    const { step, setStep } = this.props;
    return (
      <div className="my-3">
        <p>
          Interview for #546673. This is the practice session and is not part of
          your actual interview. You can practice as many tims as you want.
        </p>

        <div className="quiz-container">
          <div className="quiz-row">
            <div className="p-2">
              <span style={{ fontWeight: "bold" }}>
                Question {index + 1 + " / " + practice.length}
              </span>
              <h6>{current.question} </h6>
            </div>
            <div className="cam-container">
              {
                <video
                  style={{ width: 300 }}
                  ref={(v) => {
                    this.video = v;
                  }}
                >
                  Video stream not available.
                </video>
              }
            </div>
          </div>
          <h6>
            Time left <strong className="mx-2">{remaining} seconds</strong>
          </h6>
        </div>

        <div className="d-flex align-items-center justify-content-center mb-3 mt-5">
          <input
            value={this.state.checked}
            onChange={(e) => this.setState({ checked: e.target.checked })}
            type="checkbox"
            className="check-box"
          />
          {end ? (
            <button
              className="btn btn-primary"
              onClick={() => setStep(step + 1)}
            >
              Submit
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={this.handleNextQuestion}
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    );
  }
}
