import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { timerStateAtoms } from "./atoms";
import { motion } from "framer-motion";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  height: 100vh;
  background-color: #78c0fc;
`;

const TimerContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  max-width: 550px;
  height: 20%;
  margin-top: 40px;
  background-color: #51aaf3;

  border-radius: 10px;
`;

const Timer = styled(motion.span)`
  font-size: 6rem;
  color: #faf3e7;
`;

const InfoContainer = styled.div`
  display: flex;

  justify-content: space-around;
  width: 70%;
  color: #e0e0e0;

  font-size: 1.25rem;
`;

const RoundSpan = styled.span``;

const GoalSpan = styled.span``;

const ButtonContainer = styled.div`
  margin: 120px 0px;
`;

const StartButton = styled(motion.button)`
  padding: 15px 20px;
  width: 120px;
  height: 120px;
  border-radius: 100%;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;

  transition: all 300ms;
`;
function App() {
  const [timerState, setTimerState] = useRecoilState(timerStateAtoms);
  const [run, setRun] = useState(false);
  const [time, setTime] = useState(3);
  useEffect(() => {
    const timer =
      run && time > 0 && setInterval(() => setTime((prev) => prev - 1), 1000);
    if (time === 0) {
      setTime(1500);
      setTimerState((prev) => {
        return {
          round: prev.round + 1,
          goal: prev.goal,
        };
      });
    }

    if (timerState.round > 4) {
      setTimerState((prev) => {
        return {
          round: 0,
          goal: prev.goal + 1,
        };
      });
    }

    return () => clearInterval(timer as number);
  }, [time, run]);

  const getTime = (number: number) => {
    const sec = number % 60;
    const min = Math.floor(number / 60);
    return `${min > 9 ? min : `0${min}`} : ${sec > 9 ? sec : `0${sec}`}`;
  };

  return (
    <Container>
      {run ? (
        <TimerContainer
          animate={{ scale: 1.25 }}
          transition={{
            ease: "easeOut",
            duration: 0.5,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <Timer>{getTime(time)}</Timer>
        </TimerContainer>
      ) : (
        <TimerContainer>
          <Timer>{getTime(time)}</Timer>
        </TimerContainer>
      )}

      <ButtonContainer>
        <StartButton
          whileHover={{ scale: 1.2 }}
          onClick={() => {
            setRun((prev) => !prev);
          }}
        >
          {run ? "STOP" : "START"}
        </StartButton>
      </ButtonContainer>
      <InfoContainer>
        <RoundSpan>ROUND : {timerState.round} / 4</RoundSpan>
        <GoalSpan>GOAL : {timerState.goal} / 12</GoalSpan>
      </InfoContainer>
    </Container>
  );
}

export default App;
