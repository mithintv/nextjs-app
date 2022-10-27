import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

export declare interface AppProps {
  children?: React.ReactNode;
}

function Layout(props: AppProps) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
