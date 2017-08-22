import { inject } from 'aurelia-dependency-injection';
import { Project, ProjectItem, CLIOptions, UI } from 'aurelia-cli';

@inject(Project, CLIOptions, UI)
export default class TestGenerator {

  constructor(private project: Project, private options: CLIOptions, private ui: UI) { }

  execute() {
    return this.ui
      .ensureAnswer(this.options.args[0], '(n)o-dependency, (a)bsolute dependency path, (r)elative dependency path')
      .then(arg => {

        let path:string;
        let modelClassName:string;

        //with no dependencies, this works fine
        if (arg == 'n') {
          path = '../../src/models/no-dep-model';
          modelClassName = 'NoDepModel';

        //with an absolute path for the dependency, it fails
        } else if (arg == 'a') {
          path = '../../src/models/abs-dep-model';
          modelClassName = 'AbsDepModel';

        //and with a relative path for the dependency, it works...
        } else {
          path = '../../src/models/rel-dep-model';
          modelClassName = 'RelDepModel';
        }

        let mod = require(path);
        let item = new mod[modelClassName]();
    
        let keys = [];
        let tpl = '';

        for (var key in item) {
          if (key == 'Id') continue;
    
          //obviously, I would generate more stuff in here and create an output file but this is just an example
          if (item.hasOwnProperty(key)) {
            tpl += `
              <tr>
                  <td>${key}</td>
                  <td><span>\${selectedItem.${key}}</span></td>
                </tr>`;
          }
        }

        //I get an output here...
        console.log(tpl);
      });
  }
}