import React from 'react';
import { withTranslation } from 'react-i18next';

function Translate({ t, i18n }) {
  return <p>{t('frontpageTitle')}</p>
}

export default withTranslation()(Translate);