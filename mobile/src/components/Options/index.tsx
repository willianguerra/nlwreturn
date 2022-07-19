import React from 'react';
import { Text, View } from 'react-native';
import { Copyright } from '../Copyright';
import { Option } from '../Option';

import { styles } from './styles';
import { feedbackTypes } from '../../utils/feedbackTypes'
import { FeedBackTypes } from '../Widget'

interface Props {
  onFeedbackTypeChanged: (feedbackTypes: FeedBackTypes) => void;
}

export function Options({ onFeedbackTypeChanged }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu FeedBack</Text>

      <View style={styles.options}>
        {
          Object.entries(feedbackTypes).map(([key, value]) => {
            return (
              <Option
                key={key}
                title={value.title}
                image={value.image}
                onPress={() => onFeedbackTypeChanged(key as FeedBackTypes)} />
            )
          })
        }

      </View>
      <Copyright />
    </View>
  );
}