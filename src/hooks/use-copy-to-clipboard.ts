import { useState } from 'react';
import { toast } from 'sonner';

export const useCopyToClipboard = () => {
    const [copied, setCopied] = useState(false);

    const copy = async (text: string) => {
        if (!navigator.clipboard) {
            toast.warning('Clipboard not supported');
            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            return true;
        } catch (error) {
            toast.warning('Copy failed', error);
            setCopied(false);
            return false;
        }
    };

    return { copied, copy };
};
