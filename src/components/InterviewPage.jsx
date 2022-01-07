/* eslint-env browser */
import React from "react";
import * as questions from "../questions.json";

const videoType = "video/webm";

export default class InterviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      videos: [],
      current: {},
      practice: [
        {
          id: "0",
          question: "What did you do before this?",
          duration: 3,
        },
      ],
      index: 0,
      end: false,
    };
  }

  async componentDidMount() {
    const { interview } = questions;
    const quiz = interview?.find((p) => p.id === this.state.index.toString());
    this.setState({ current: quiz });
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

  startRecording(e) {
    e.preventDefault();
    // wipe old data chunks
    this.chunks = [];
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);
    // say that we're recording
    this.setState({ recording: true });
  }

  stopRecording(e) {
    e.preventDefault();
    // stop the recorder
    this.mediaRecorder.stop();
    // say that we're not recording
    this.setState({ recording: false });
    // save the video to memory
    this.saveVideo();
  }

  handleNextQuestion = () => {
    const { interview } = questions;
    const length = interview.length;
    if (length === this.state.index + 2) {
      this.setState({ end: true });
    } 
    
    if(this.state.index +1 <= length){
      this.setState({ index: this.state.index + 1 });
    }
  };

  saveVideo() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, { type: videoType });
    // generate video url from blob
    const videoURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    const videos = this.state.videos.concat([videoURL]);
    this.setState({ videos });
  }



  render() {
    const { recording, videos, current,  index, end } = this.state;
    const { interview } = questions;
    const { step, setStep } = this.props;

    console.log(this.state);

    return (
      <div className="my-3">
        <p>
          Interview for #546673. This is the interview session and is not part of
          your actual interview. You can practice as many tims as you want.
        </p>

        <div className="quiz-container">
          <div className="quiz-row">
            <div className="p-2">
              <span style={{ fontWeight: "bold" }}>
                Question {index + 1 + " / " + interview.length}
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
            Time left{" "}
            <strong className="mx-2">{current.duration} minutes</strong>
          </h6>
        </div>

        <div className="d-flex align-items-center justify-content-center mb-3 mt-5">
          <input type="checkbox" className="check-box" />
          {end ? (
            <button
              className="btn btn-primary"
              onClick={()=>setStep(step+1)}
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
