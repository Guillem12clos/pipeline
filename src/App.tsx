import './App.css';
import { feedbackMachine } from './feedbackMachine';
import { useMachine } from '@xstate/react';
import { createBrowserInspector } from '@statelyai/inspect';
import git from './imatges/git.png';
import docker from './imatges/docker.png';
import JUnit from './imatges/JUnit.png';
import maven from './imatges/maven.png';

const { inspect } = createBrowserInspector({
  // Comment out the line below to start the inspector
  autoStart: false
});

function Feedback() {
  const [state, send] = useMachine(feedbackMachine, {
    inspect
  });

  return (
    <div className="feedback">
    
      {state.matches('parada') && (
        <div className="step">
          <h2>Parada</h2>
          <button
            className="button"
            onClick={() => send({ type: 'event.git' })}
          >
            git tira event
          </button>
        </div>
      )}

      {state.matches('obtenir') && (
        <div className="step">
          <h2>Obtenir el codi</h2>
          <img src={git} alt="logo"/>
          <h2></h2>
          <button
            className="button"
            onClick={() => send({ type: 'codi.obtingut' })}
          >
            codi obtingut
          </button>
        </div>
      )}

      {state.matches('test') && (
        <div className="step">
          <h2>test</h2>
          <img src={JUnit} alt="logo"/>
          <h2></h2>
          <button
            className="button"
            onClick={() => send({ type: 'test.ok1' })}
          >
            ok
          </button>
        </div>
      )}
      {state.matches('build') && (
        <div className="step">
          <h2>build</h2>
          <img src={maven} alt="logo"/>
          <h2></h2>
          <button
            className="button"
            onClick={() => send({ type: 'build.finish' })}
          >
            finish
          </button>
        </div>
      )}
      {state.matches('deployPre') && (
        <div className="step">
          <h2>deploy pre</h2>
          <img src={docker} alt="logo"/>
          <h2></h2>
          <button
            className="button"
            onClick={() => send({ type: 'servidor' })}
          >
            servidor
          </button>
        </div>
      )}
      {state.matches('userTestPre') && (
        <div className="step">
          <h2>user test pre</h2>
          <img src={docker} alt="logo"/>
          <h2></h2>
          <button
            className="button"
            onClick={() => send({ type: 'test.ok2' })}
          >
            ok
          </button>
        </div>
      )}
      {state.matches('deployPro') && (
        <div className="step">
          <h2>deploy pro</h2>
          <img src={docker} alt="logo"/>
          <h2></h2>
          <button
            className="button"
            onClick={() => send({ type: 'deploy.done' })}
          >
            done
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  return <Feedback />;
}

export default App;
