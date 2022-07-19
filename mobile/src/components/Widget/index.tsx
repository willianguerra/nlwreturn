import React, { useRef, useState } from "react";

import { ChatTeardropDots } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet"
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { Form } from "../Form";
import { Success } from "../Success";
import { Options } from "../Options";

import { theme } from "../../theme";
import { styles } from "./styles"

import { feedbackTypes } from '../../utils/feedbackTypes'

export type FeedBackTypes = keyof typeof feedbackTypes;

export function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedBackTypes | null>(null);
  const [feedbackSend, setFeedbackSend] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleRestartFeedback() {
    setFeedbackType(null)
    setFeedbackSend(false)
  }

  function handleFeedbackSend() {
    setFeedbackSend(true)
  }

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpen}
      >
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight="bold" />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSend ? <Success onSendAnotherFeedback={handleRestartFeedback} />
            :
            <>
              {
                feedbackType ? <Form onFeedbackSend={handleFeedbackSend} onFeedbackCanceled={handleRestartFeedback} feedbackType={feedbackType} /> : <Options onFeedbackTypeChanged={setFeedbackType} />
              }
            </>

        }

      </BottomSheet>
    </>
  );
}


export default gestureHandlerRootHOC(Widget)