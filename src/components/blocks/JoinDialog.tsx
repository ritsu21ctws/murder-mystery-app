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
import { ActionButton } from '@/components/atoms/ActionButton';

type Props = {
  openConfirm: boolean;
  setOpenConfirm: (open: boolean) => void;
  loading: boolean;
  onClick: () => void;
  eventName: string | undefined;
};

export const JoinDialog: React.FC<Props> = memo((props) => {
  const { openConfirm, setOpenConfirm, loading, onClick, eventName } = props;
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
          <DialogTitle>参加の確認</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text>「{eventName}」に参加します。よろしいですか？</Text>
        </DialogBody>
        <DialogFooter mb="2">
          <DialogActionTrigger asChild>
            <Button variant="outline" aria-label="Cancel join">
              キャンセル
            </Button>
          </DialogActionTrigger>
          <ActionButton loading={loading} onClick={onClick}>
            参加
          </ActionButton>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
});
