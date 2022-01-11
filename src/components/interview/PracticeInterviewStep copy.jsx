import React, { useEffect, useRef, useState } from "react";
import * as questions from "../../questions.json";
import { RecordRTCPromisesHandler } from "recordrtc";
import { Player } from "video-react";

const videoType = "video/webm";

const PracticeInterviewStep = ({ step, setStep }) => {
  const [index, setIndex] = useState(0);
  const [current, setCurrent] = useState(0);
  const [end, setEnd] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [stream, setStream] = useState(null);
  const [recorder, setRecorder] = useState();

  const videoRef = useRef();

  const { practice } = questions;

  useEffect(() => {
    const quiz = practice?.find((p) => p.id === index.toString());
    setCurrent(quiz);
  }, [index, practice]);

  const handleNextQuestion = () => {
    const length = practice.length;
    if (length === index + 2) {
      setEnd(true);
    } else {
      setIndex(index + 1);
    }
  };

  let video;

  useEffect(() => {
    const loadStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoRef.current.srcObject = stream;

      const recorder = new RecordRTCPromisesHandler(stream, {
        type: "video",
      });

      await recorder.startRecording();

      setRecorder(recorder);
      setVideoBlob(null);
      setStream(stream);
    };
    loadStream();
  }, []);

  useEffect(() => {
    // Let's update the srcObject only after the ref has been set
    // and then every time the stream prop updates
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [video]);

  const stopRecording = async () => {
    if (recorder) {
      await recorder.stopRecording();
      const blob = await recorder.getBlob();
      stream.stop();
      setVideoBlob(blob);
      setStream(null);
      setRecorder(null);
    }
  };

  console.log({ stream });

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
            {/* {(
              <video
                // ref={videoRef}
                style={{ width: "100%", height: "100%" }}
                // src={window.URL.createObjectURL(videoBlob)}
                src="https://www.youtube.com/watch?v=RHq6bEgeZD4"
                autoPlay
                loop
              />
            )} */}

<Player src={"https://www.youtube.com/watch?v=RHq6bEgeZD4"} />
            {/* {!!videoBlob && (
            )} */}
          </div>
        </div>
        <h6>
          Time left <strong className="mx-2">{current.duration} minutes</strong>
        </h6>
      </div>

      <div className="d-flex align-items-center justify-content-center mb-3 mt-5">
        <input type="checkbox" className="check-box" />
        {end ? (
          <button className="btn btn-primary" onClick={handleNextQuestion}>
            Submit
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleNextQuestion}>
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default PracticeInterviewStep;
