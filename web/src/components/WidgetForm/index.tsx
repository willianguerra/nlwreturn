import { useState } from "react";
import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { FeedbackTypesStep } from "./Steps/FeedBackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedBackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedBackSuccessStep";
// import { FeedbackTypesStep } from "Steps/FeedBackTypeStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "Imagem de um inseto",
    }
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: "Imagem de uma lampada",
    }
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUrl,
      alt: "Imagem de um balao de pensamento",
    }
  },
}

export type FeedbackTypes = keyof typeof feedbackTypes;

export function WidgetForm() {

  function handleRestartFeedback() {
    setFeedbackSend(false);
    setFeedbackType(null);
  }

  const [feedbackType, setFeedbackType] = useState<FeedbackTypes | null>(null);
  const [feedbackSend, setFeedbackSend] = useState(false);

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-1rem)] md:w-auto">
      {feedbackSend ? (
        <FeedbackSuccessStep onFeedbackRestartRequest={handleRestartFeedback} />
      ) :
        <>
          {!feedbackType ?
            (
              <FeedbackTypesStep onFeedbackTypeChanged={setFeedbackType} />
            ) : (
              <FeedbackContentStep
                feedbackType={feedbackType}
                onFeedbackRestartRequest={handleRestartFeedback}
                onFeedbackSend={() => setFeedbackSend(true)}
              />
            )
          }
        </>
      }

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela <a className="underline underline-offset-1" href="https://rocketseat.com.br"> Rocketseat</a>
      </footer>
    </div>
  );
}