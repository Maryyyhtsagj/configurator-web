import React from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import SimpleHeader from '../../ui-kit/SimpleHeader';
import { DICTIONARY } from '../../translations/dictionary';
import useTranslations from '../../hooks/useTranslations';
import EmptyHeight from '../../components/EmptyHeight';

function PrivacyPolicy() {
  const { t } = useTranslations();

  const sections = [
    { title: 'policy1Title', content: ['policy1_1', 'policy1_2', 'policy1_3'] },
    { title: 'policy2Title', content: ['policy2_1', 'policy2_1_purposes'] },
    { title: 'policy3Title', content: ['policy3_1', 'policy3_1_data'] },
    { title: 'policy4Title', content: ['policy4_1', 'policy4_2', 'policy4_3'] },
    { title: 'policy5Title', content: ['policy5_1'] },
    { title: 'policy6Title', content: ['policy6_1', 'policy6_2'] },
    { title: 'policy7Title', content: ['policy7_1', 'policy7_2'] },
    { title: 'policy8Title', content: ['policy8_1'] },
    { title: 'policy9Title', content: ['policy9_1'] },
  ];

  return (
    <div className={styles.privacy}>
      <div className={classNames('container')}>
        <div className={styles.privacyInner}>
          <SimpleHeader
            subtitle={t(DICTIONARY.privacySubTitle)}
            title={t(DICTIONARY.privacyTitle)}
            isCenter
          />

          <div>
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className={styles.section}>
                <p className={styles.mainTitle}>{t(DICTIONARY[section.title])}</p>

                {section.content.map((contentKey, index) => {
                  const contentValue = t(DICTIONARY[contentKey]);
                  const content = Array.isArray(contentValue)
                    ? contentValue.join('')
                    : contentValue;

                  return (
                    <p
                      key={index}
                      className={styles.subTitle}
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  );
                })}

                <EmptyHeight height={20} width={0} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
