import { useRecoilTransactionObserver_UNSTABLE } from "recoil";
import { keysAbleToSave } from "../recoil/utils";

export default function DebugObserver() {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    for (const modifiedAtom of snapshot.getNodes_UNSTABLE({
      isModified: true,
    })) {
      const atom = snapshot.getLoadable(modifiedAtom);
      if (
        atom.state === "hasValue" &&
        keysAbleToSave.indexOf(modifiedAtom.key) !== -1
      ) {
        localStorage.setItem(
          modifiedAtom.key,
          JSON.stringify({ value: atom.contents })
        );
      }
    }
  });

  return null;
}
