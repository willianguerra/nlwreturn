import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { FeedBackTypes } from '../../components/Widget';
import { ScreenshotButton } from '../../components/ScreenshotButton';
import { Button } from '../../components/Button';
import { feedbackTypes } from '../../utils/feedbackTypes'

import { styles } from './styles';
import { Copyright } from '../Copyright';
import { api } from '../../libs/api';

interface Props {
  feedbackType: FeedBackTypes;
  onFeedbackCanceled: () => void;
  onFeedbackSend: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSend }: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [comment, setComment] = useState('');

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
      .then(uri => setScreenshot(uri))
      .catch(error => console.log(error))
  }
  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleSendFeedback() {
    if (isSendingFeedback) {
      return
    }
    setIsSendingFeedback(true);

    const screenshotBase64 = screenshot && FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'})

    try {

      await api.post('/feedback', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment
      });

      onFeedbackSend();
    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false);

    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        onChangeText={setComment}
        value='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        style={styles.input}
        placeholder="Algo nao esta funcionando bem? Queremos Corrigir!"
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
      />

      <View style={styles.footer}>
        <ScreenshotButton onTakeShot={handleScreenshot} onRemoveShot={handleScreenshotRemove} screenshot={screenshot} />
        <Button onPress={handleSendFeedback} isLoading={isSendingFeedback} />
      </View>

      <Copyright />
    </View >

  );
}