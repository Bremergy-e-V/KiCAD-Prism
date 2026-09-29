import { useRef, useState, type CSSProperties } from "react";
import {
    CheckCircle,
    Circle,
    MessageSquareReply,
    Trash2,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { CommentSeverityBadge } from "@/components/comment-severity-badge";
import { TrackerIssueAction } from "@/features/tracker-integration/tracker-issue-action";
import { formatCommentTimestamp } from "@/components/comment-date";
import { cn } from "@/lib/utils";
import { commentClassLabel, type Comment } from "@/types/comments";
import { ThreadMessage } from "@/features/rich-comments/thread-message";
import {
    RichComposer,
    type RichComposerHandle,
    type RichComposerState,
} from "@/features/rich-comments/rich-composer";

interface CommentCardProps {
    projectId: string;
    comment: Comment;
    screenPosition: { x: number; y: number } | null;
    canModify: boolean;
    onClose: () => void;
    onResolve: (commentId: string, resolved: boolean) => void;
    onReply: (commentId: string, content: string) => Promise<void>;
    onDelete: (commentId: string) => Promise<void>;
    onPromote?: (commentId: string) => Promise<void>;
    onRetrySync?: (commentId: string) => Promise<void>;
}

/**
 * Compact floating card shown when a canvas comment marker is clicked.
 */
export function CommentCard({
    projectId,
    comment,
    screenPosition,
    canModify,
    onClose,
    onResolve,
    onReply,
    onDelete,
    onPromote,
    onRetrySync,
}: CommentCardProps) {
    const [replyOpen, setReplyOpen] = useState(false);
    const [replySeed, setReplySeed] = useState<string | undefined>(undefined);
    const [reply, setReply] = useState<RichComposerState>({ markdown: "", uploading: false });
    const [busy, setBusy] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const replyRef = useRef<RichComposerHandle>(null);
    const isResolved = comment.status === "RESOLVED";
    const canSendReply = Boolean(reply.markdown) && !reply.uploading && !busy;

    const style: CSSProperties = screenPosition
        ? {
              left: Math.min(Math.max(screenPosition.x + 12, 8), window.innerWidth - 320),
              top: Math.min(Math.max(screenPosition.y - 8, 8), window.innerHeight - 200),
          }
        : {
              left: "50%",
              top: "20%",
              transform: "translateX(-50%)",
          };

    const submitReply = async () => {
        if (!canSendReply) return;
        setBusy(true);
        try {
            await onReply(comment.id, reply.markdown);
            replyRef.current?.clear();
            setReplyOpen(false);
            setReplySeed(undefined);
        } finally {
            setBusy(false);
        }
    };

    const canInteract = canModify && comment.permissions?.canReply !== false;
    const quote = (markdown: string) => {
        if (replyOpen && replyRef.current) {
            replyRef.current.insertMarkdown(markdown);
            return;
        }
        setReplySeed(markdown);
        setReplyOpen(true);
    };

    return (
        <dialog
            open
            className={cn(
                "fixed z-[110] m-0 w-80 rounded-md border bg-background p-0 text-foreground shadow-lg",
                isResolved && "opacity-80",
            )}
            style={style}
            aria-label="Comment details"
        >
            <div className="flex items-start justify-between gap-2 border-b px-3 py-2">
                <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{comment.author}</div>
                    <div className="text-[10px] text-muted-foreground">
                        {formatCommentTimestamp(comment.timestamp)}
                        {comment.elementRef ? ` · ${comment.elementRef}` : ""}
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0"
                    onClick={onClose}
                    aria-label="Close comment card"
                >
                    <X className="h-3.5 w-3.5" />
                </Button>
            </div>

            <div className="flex flex-wrap gap-1 px-3 pt-2">
                <Badge variant="secondary" className="h-5 text-[10px]">
                    {commentClassLabel(comment.commentClass ?? "general")}
                </Badge>
                <CommentSeverityBadge severity={comment.severity ?? "info"} />
            </div>

            <ThreadMessage
                projectId={projectId}
                thread={comment}
                canInteract={canInteract}
                onQuote={quote}
                bodyClassName="max-h-72 overflow-y-auto"
                className="px-3 py-2"
            />

            {(comment.tracker?.linkState || comment.permissions?.canPublish) && (
                <div className="px-3 pb-2">
                    <TrackerIssueAction comment={comment} onPromote={onPromote} onRetry={onRetrySync} />
                </div>
            )}

            {comment.mentions && comment.mentions.length > 0 && (
                <div className="flex flex-wrap gap-1 px-3 pb-2">
                    {comment.mentions.map((email) => (
                        <Badge key={email} variant="outline" className="max-w-full truncate text-[10px]">
                            @{email}
                        </Badge>
                    ))}
                </div>
            )}

            {comment.replies.length > 0 && (
                <div className="space-y-2 border-t bg-muted/30 px-3 py-2">
                    {comment.replies.slice(-3).map((item) => (
                        <div key={item.id ?? `${item.timestamp}-${item.author}-${item.content}`} className="text-xs">
                            <span className="font-medium">{item.author}</span>
                            <ThreadMessage
                                projectId={projectId}
                                thread={comment}
                                reply={item}
                                canInteract={canInteract}
                                onQuote={quote}
                                bodyClassName="text-xs text-muted-foreground"
                            />
                        </div>
                    ))}
                </div>
            )}

            {replyOpen && canModify && (
                <div className="border-t px-3 py-2">
                    <span className="mb-1 block text-xs font-medium">Reply</span>
                    {/* Opening the reply box is a deliberate request to type in it, so
                        focus follows the reveal. The card itself never takes focus. */}
                    <RichComposer
                        ref={replyRef}
                        projectId={projectId}
                        ariaLabel="Reply"
                        autoFocus
                        placeholder="Write a reply…"
                        initialMarkdown={replySeed}
                        onChange={setReply}
                        onSubmit={() => void submitReply()}
                        onCancel={() => setReplyOpen(false)}
                        disabled={busy}
                        minHeightClassName="min-h-16"
                    />
                    <div className="mt-2 flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setReplyOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            disabled={!canSendReply}
                            onClick={() => void submitReply()}
                        >
                            Reply
                        </Button>
                    </div>
                </div>
            )}

            {canModify && (
                <div className="flex items-center justify-end gap-1 border-t px-2 py-1.5">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="Reply"
                        onClick={() => {
                            setReplySeed(undefined);
                            setReplyOpen((open) => !open);
                        }}
                    >
                        <MessageSquareReply className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-8 w-8", isResolved && "text-success")}
                        aria-label={isResolved ? "Reopen comment" : "Resolve comment"}
                        onClick={() => onResolve(comment.id, !isResolved)}
                    >
                        {isResolved ? (
                            <CheckCircle className="h-4 w-4" />
                        ) : (
                            <Circle className="h-4 w-4" />
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        aria-label="Delete comment"
                        onClick={() => setConfirmDelete(true)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )}

            <ConfirmDialog
                open={confirmDelete}
                onOpenChange={setConfirmDelete}
                title="Delete comment"
                description="This removes the comment and its replies from the review thread. It cannot be undone."
                confirmLabel="Delete comment"
                onConfirm={() => {
                    setConfirmDelete(false);
                    void onDelete(comment.id);
                }}
            />
        </dialog>
    );
}
