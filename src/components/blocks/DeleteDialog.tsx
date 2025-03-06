import React, { memo } from 'react';
import { Button, Text } from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import { SecondaryButton } from '@/components/atoms/SecondaryButton';

type Props = {
  openConfirm: boolean;
  setOpenConfirm: (open: boolean) => void;
  loading: boolean;
  onClick: () => void;
};

export const DeleteDialog: React.FC<Props> = memo((props) => {
  const { openConfirm, setOpenConfirm, loading, onClick } = props;
  return (
    <DialogRoot
      role="alertdialog"
      lazyMount
      open={openConfirm}
      onOpenChange={(e) => setOpenConfirm(e.open)}
      motionPreset="slide-in-bottom"
      trapFocus={false}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>削除の確認</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text>削除したデータは戻せません。削除してもよろしいですか？</Text>
        </DialogBody>
        <DialogFooter mb="2">
          <DialogActionTrigger asChild>
            <Button variant="outline" aria-label="Cancel delete">
              キャンセル
            </Button>
          </DialogActionTrigger>
          <SecondaryButton loading={loading} onClick={onClick}>
            削除
          </SecondaryButton>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
});
