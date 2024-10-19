import { Story } from './types';

export const story: Story =
{
  "s1": {
    "text": "As the clock struck midnight, you sat alone in the dimly lit office, the glow of your monitor casting eerie shadows on the walls. The code you were working on seemed to have a mind of its own, lines rearranging themselves in cryptic patterns. Suddenly, a message appeared on the screen: 'Help me escape.' You felt a chill run down your spine. Was this a prank, or something more sinister?",
    "backgroundTransform": "A dimly lit office with a glowing computer screen casting shadows, creating an eerie atmosphere.",
    "choices": {
      "a": {
        "nextScene": "s2a",
        "action": "Investigate the source of the message",
        "choiceDescription": "I lean closer to the screen, curious to see where the message came from and determined to get to the bottom of this."
      },
      "b": {
        "nextScene": "s2b",
        "action": "Ignore it and continue coding",
        "choiceDescription": "I brush it off as a weird glitch, refocusing on my code and trying to make progress despite the distraction.",
        "quest": "Countdown"
      }
    }
  },
  "s2a": {
    "text": "You decided to investigate the source of the message. As you delved deeper into the code, you noticed strange anomalies — functions that shouldn't exist, variables with names that sent shivers down your spine. Suddenly, the lights flickered, and the temperature dropped. A shadowy figure appeared on the screen, whispering, 'Find the key, or be trapped forever.'",
    "backgroundTransform": "A programmer's desk with flickering lights and a shadowy figure on the computer screen.",
    "choices": {
      "a": {
        "nextScene": "s3a",
        "action": "Search for the key in the code",
        "choiceDescription": "I scroll through the code, scanning every function and variable name, convinced there must be a hidden clue in the lines.",
        "quest": "ScrambledCode"
      },
      "b": {
        "nextScene": "s3b",
        "action": "Try to shut down the computer",
        "choiceDescription": "Feeling uneasy, I try to power off the computer, hoping to shut down whatever is happening.",
        "quest": "Countdown"
      }
    }
  },
  "s2b": {
    "text": "You chose to ignore the message and continued coding. However, the code began to glitch, and your screen filled with static. Suddenly, the room was plunged into darkness, and the only light came from the screen, now displaying a countdown timer. You realized you had to act quickly.",
    "backgroundTransform": "A dark room with a computer screen displaying a countdown timer.",
    "choices": {
      "a": {
        "nextScene": "s3a",
        "action": "Try to debug the code",
        "choiceDescription": "I focus intensely on the screen, determined to find the bug before the timer hits zero.",
        "quest": "ScrambledCode"
      },
      "b": {
        "nextScene": "s3b",
        "action": "Look for a backup power source",
        "choiceDescription": "I quickly scan the room, hoping to find a backup power supply to prevent the system from crashing."
      }
    }
  },
  "s3a": {
    "text": "You searched through the code, your fingers flying over the keyboard. As you found the hidden key, the shadowy figure reappeared, its voice echoing, 'You have found the key, but the door remains locked. Solve the riddle to escape.' The screen displayed a complex algorithm, its solution the key to your freedom.",
    "backgroundTransform": "A programmer's desk with a complex algorithm displayed on the screen and a shadowy figure looming.",
    "choices": {
      "a": {
        "nextScene": "s4a",
        "action": "Attempt to solve the algorithm",
        "choiceDescription": "I dive deep into the logic of the algorithm, trying to crack it step-by-step.",
        "quest": "MisteryForm"
      },
      "b": {
        "nextScene": "s4b",
        "action": "Seek help from an online forum",
        "choiceDescription": "I jump onto a forum and post a message, hoping for a quick response before time runs out."
      }
    }
  },
  "s3b": {
    "text": "In a panic, you reached for the power button, but it was unresponsive. The shadowy figure on the screen laughed, 'You cannot escape so easily.' The countdown continued, and you realized you needed another plan.",
    "backgroundTransform": "A programmer's desk with an unresponsive power button and a sinister figure on the screen.",
    "choices": {
      "a": {
        "nextScene": "s4a",
        "action": "Try to solve the algorithm",
        "choiceDescription": "I pivot my focus to the algorithm on the screen, hoping it's the way out.",
        "quest": "MisteryForm"
      },
      "b": {
        "nextScene": "s4b",
        "action": "Seek help from an online forum",
        "choiceDescription": "I type frantically on an online forum, praying someone has an answer."
      }
    }
  },
  "s4a": {
    "text": "You focused all your energy on solving the algorithm. As the solution became clear, the shadowy figure began to fade, its voice now a distant echo. The room brightened, and the countdown stopped. You had broken the curse, freeing yourself and the trapped entity within the code.",
    "backgroundTransform": "A programmer's desk with a solved algorithm on the screen and the room brightening.",
    "choices": {
      "a": {
        "nextScene": "s5a",
        "action": "Reflect on the experience",
        "choiceDescription": "I sit back in my chair, exhaling slowly as I process what just happened."
      },
      "b": {
        "nextScene": "s5d",
        "action": "Share the story with colleagues",
        "choiceDescription": "I can’t wait to tell my colleagues about this strange night and see their reactions."
      }
    }
  },
  "s4b": {
    "text": "You quickly typed a plea for help on an online forum. As responses flooded in, one stood out —a user with the handle 'GhostCoder' provided a cryptic clue: 'Don't you dare to save raw passwords.'",
    "backgroundTransform": "A programmer's desk with a forum page open and a brightening room.",
    "choices": {
      "a": {
        "nextScene": "s5c",
        "action": "Write the solution based on the clue",
        "choiceDescription": "I apply the hint to my code, hoping it's the key to unlocking the mystery.",
        "quest": "MisteryForm"
      },
      "b": {
        "nextScene": "s5b",
        "action": "Panic",
        "choiceDescription": "Feeling overwhelmed, I make a mistake in the code, my heart racing."
      }
    }
  },
  "s5a": {
    "text": "As you leaned back in your chair, you couldn't help but wonder about the entity trapped in the code. Was it a ghost from the digital realm, or just a clever prank? Either way, you felt a sense of accomplishment and relief, knowing you had faced the unknown and emerged victorious.",
    "backgroundTransform": "A programmer's desk with a relaxed and thoughtful atmosphere.",
    "choices": {}
  },
  "s5b": {
    "text": "In your panic, you made a critical mistake in the code. The shadowy figure on the screen laughed menacingly as the countdown reached zero. The room went completely dark, and you felt a cold presence enveloping you. You realized too late that you were trapped, just like the entity before you.",
    "backgroundTransform": "A dark room with a sinister atmosphere, the screen now blank.",
    "choices": {}
  },
  "s5c": {
    "text": "With the clue in mind, you wrote the solution into the code. The shadowy figure on the screen began to dissolve, and the room filled with light. You had solved the mystery, freeing both yourself and the entity. The screen displayed a final message: 'Thank you.'",
    "backgroundTransform": "A programmer's desk with a bright screen displaying a 'Thank you' message.",
    "choices": {
      "a": {
        "nextScene": "s5a",
        "action": "Reflect on the experience",
        "choiceDescription": "I lean back in my chair, feeling satisfied and relieved."
      },
      "b": {
        "nextScene": "s5d",
        "action": "Share the story with colleagues",
        "choiceDescription": "I can’t wait to tell everyone what just happened!"
      }
    }
  },
  "s5d": {
    "text": "You gathered your colleagues and recounted the night's events. They listened with wide eyes, some skeptical, others intrigued. As you finished your story, you all shared a laugh, but a lingering question remained—was it just a Halloween prank, or something more? The mystery of the ghost in the code would remain unsolved, at least for now.",
    "backgroundTransform": "An office setting with a group of colleagues gathered around, listening to a story.",
    "choices": {}
  }
};
