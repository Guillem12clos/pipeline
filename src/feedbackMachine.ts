import { assign, setup } from 'xstate';

export const feedbackMachine = setup({
  types: {
    context: {} as { feedback: string },
    events: {} as
      | {type: 'event.git'}
      | {type: 'codi.obtingut'}
      | {type: 'test.ok1'}
      | {type: 'build.finish'}
      | {type: 'servidor'}
      | { type: 'test.ok2' }
      | { type: 'deploy.done' }
  },
  guards: {
    feedbackValid: ({ context }) => context.feedback.length > 0
  }
}).createMachine({
  id: 'feedback',
  initial: 'parada',
  context: {
    feedback: ''
  },
  states: {
    parada: {
      on: {
        'event.git': 'obtenir'
      }
    },
    obtenir: {
      on: {
        'codi.obtingut': 'test'
      }
    },
    test: {
      on:{
        'test.ok1': 'build'
      }
    },
    build: {
      on: {
        'build.finish': 'deployPre'
      }
    },
    deployPre: {
      on: {
        'servidor': 'userTestPre'
      }
    },
    userTestPre: {
      on: {
        'test.ok2': 'deployPro'
      }
    },
    deployPro: {
      on: {
        'deploy.done': 'parada'
      }
    }
  },
  
});
