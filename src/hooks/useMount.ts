import { EffectCallback, useEffect } from 'react';

export default function useMount(effect: EffectCallback) {
  useEffect(effect, [])
}