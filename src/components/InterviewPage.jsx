/* eslint-env browser */
import React from "react";
import Context from "../context";
import * as questions from "../questions.json";

const videoType = "video/webm";

export default class InterviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      current: {},
      interview: [],
      index: 0,
      end: false,
    };
  }

  static contextType = Context;

  async componentDidMount() {
    const { interview } = questions;
    this.setState({ interview });
    this.setState({ current: interview[this.state.index] });
    const quiz = interview?.find((p) => p.id === this.state.index.toString());
    this.setState({ current: quiz });

    this.startRecording();
  }

  async startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    // show it to user
    this.video.srcObject = stream;
    this.video.play();

    // init recording
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: videoType,
    });
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);

    // init data storage for video chunks
    this.chunks = [];
    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      } else {
        console.log("no data");
      }
    };
    // say that we're recording
    this.setState({ recording: true });
  }

  stopRecording() {
    // stop the recorder
    this.mediaRecorder.stop();
    // say that we're not recording
    this.setState({ recording: false });
    // save the video to memory
    return this.saveVideo();
  }

  saveVideo() {
    // console.log({chunks: this.chunks});
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, { type: videoType });
    // localStorage.setItem('blob', JSON.stringify(blob))
    // generate video url from blob
    // const videoURL = window.URL.createObjectURL(blob);
    const newState = [
      ...this.context.state.videos,
      { interviewId: "awewa", questionId: this.state.current.id, blob },
    ];
    this.context.setState({
      videos: newState,
    });
    return newState;
  }

  handleNextQuestion = () => {
    this.stopRecording();
    const { interview } = this.state;
    const length = interview.length;
    if (length === this.state.index + 2) {
      this.setState({ end: true });
    }

    if (this.state.index + 1 <= length) {
      this.setState({ index: this.state.index + 1 });
      this.setState({ current: interview[this.state.index + 1] });
    }

    this.startRecording();
  };

  blobToBase64 = (blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  handleSubmit = () => {
    let state_ = this.stopRecording();
    // this.props.setStep(this.props.step + 1);
    console.log({ state_ });
    const videosBlobs = state_.map((v) => v.blob);
    const base64Videos = videosBlobs.map(
      async (blob) => await this.blobToBase64(blob)
    );

    let vsss = [];

    localStorage.removeItem("videos");

    base64Videos.forEach(async (v) => {
      v = await v;
      let vs = JSON.parse(localStorage.getItem("videos")) || [];
      vs.push(v);
      vsss.push(v);
      localStorage.setItem("videos", JSON.stringify(vs));
      // console.log(await v);
    });

    console.log({ vsss });
  };

  render() {
    const { recording, interview, current, index, end } = this.state;
    return (
      <div className="my-3">
        <p>
          Interview for #546673. This is the interview session and is not part
          of your actual interview. You can practice as many tims as you want.
        </p>

        <div className="quiz-container">
          <div className="quiz-row">
            <div className="p-2">
              <span style={{ fontWeight: "bold" }}>
                Question {index + 1 + " / " + interview.length}
              </span>
              <h6>{current?.question} </h6>
            </div>
            <div className="cam-container">
              {
                <video
                  style={{ width: 300 }}
                  ref={(v) => {
                    this.video = v;
                  }}
                  muted
                >
                  Video stream not available.
                </video>
              }
              <div className={`is-recording ${recording && "active"}`}></div>
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
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Finish
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={this.handleNextQuestion}
            >
              Next Question
            </button>
          )}
          {}
          {this.context.state.videos?.length}
        </div>
      </div>
    );
  }
}
