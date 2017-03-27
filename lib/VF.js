const {Point, Range} = require('atom');

class VF {
    constructor () {
    }

    find_nearest_namespace (out) {
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {
            let startOfFile = new Point(0, 1),
                curPos = editor.getCursorBufferPosition(),
                regEx = /@namespace (.*)/,
                range = new Range(curPos, startOfFile);
            editor.backwardsScanInBufferRange(regEx, range, (match) => {
                out.namespace = match.match[1];
            });
        }
    }

    add_namespace (out) {
        out.splice(1, 0, `@namespace \${1:[namespace]}`);
        return out;
    }

    add_memberof (out) {
        if (!out.namespace) {
            return this.add_namespace(out);
        }
        out.splice(1, 0, `@memberof \${1:${out.namespace}}`);
        return out;
    }
}

module.exports = new VF();
