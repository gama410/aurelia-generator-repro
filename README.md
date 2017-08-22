# aurelia-generator-repro
A repro of a problem involving aurelia's generator requiring TS classes with absolute dependencies

# Usage

There is a generator called *test* that you can call with the command **au generatate test**.

It takes one argument : 

* **a** to load a class with an absolute dependency
* **r** to load a class with an relative dependency
* **n** to load a class with no dependency

Using an absolute dependency, the require done by the generator will fail...