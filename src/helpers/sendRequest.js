import store from '../atoms';
import { openInfoModalAtom } from '../atoms/modalAtoms';
import sleep from './sleep';

export default async ({
  request,
  setLoading,
  warnErrorText,
  payload,
  showErrorInModal = true,
}) => {
  try {
    if (setLoading) {
      setLoading(true);
    }
    const { data } = await request(payload);

    if (data?.status === 'failed') {
      const error = new Error(data.message);
      error.response = { data };
      throw error;
    }

    return data;
  } catch (e) {
    console.warn(e?.response?.data, warnErrorText);
    if (showErrorInModal) {
      sleep(200).then(() => (
        store.set(openInfoModalAtom, {
          text: e?.response?.data?.message || 'Ошибка',
          // onButtonClick: () => onErrorModalClose(e),
        })
      ));
    }
    return e?.response?.data;
  } finally {
    if (setLoading) {
      setLoading(false);
    }
  }
};
