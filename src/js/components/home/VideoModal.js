import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function VideoModal({ title, url, show, onHide }) {
  return (
    <Dialog open={show} onOpenChange={(abierto) => !abierto && onHide()}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Video tutorial de LinkedTeam.</DialogDescription>
        </DialogHeader>
        {show && url ? (
          <div className="aspect-video overflow-hidden rounded-xl border">
            <iframe
              loading="lazy"
              className="size-full"
              src={`https://www.youtube.com/embed/${url}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
