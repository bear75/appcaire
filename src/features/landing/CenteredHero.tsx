export const CenteredHero = (props: {
  title: React.ReactNode;
  description: string;
  buttons: React.ReactNode;
}) => (
  <div className="flex flex-col items-center justify-center">
    <div className="text-center text-5xl font-bold tracking-tight">
      {props.title}
    </div>

    <div className="mx-auto mt-5 max-w-screen-md text-center text-xl text-muted-foreground">
      {props.description}
    </div>

    <div className="mt-8 flex justify-center gap-x-5 gap-y-3 max-sm:flex-col">
      {props.buttons}
    </div>
  </div>
);
