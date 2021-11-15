import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/Filetree.module.css";
import $ from "jquery";
import { reverseEngineerFiles } from "../functions/reverseEngineering";
//import langs from "./langs.json";
import {
  AiFillFolderAdd,
  AiFillFileAdd,
  AiFillFile,
  AiFillFolderOpen,
} from "react-icons/ai";
import { BsFillFolderFill } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaEllipsisV } from "react-icons/fa";
import treeItem from "../functions/FiletreeItem";
//import langs from '../langs.json'

const langs = [
  { name: "ABAP", type: "programming", extensions: [".abap"] },
  {
    name: "AGS Script",
    type: "programming",
    extensions: [".asc", ".ash"],
  },
  { name: "AMPL", type: "programming", extensions: [".ampl", ".mod"] },
  { name: "ANTLR", type: "programming", extensions: [".g4"] },
  { name: "API Blueprint", type: "markup", extensions: [".apib"] },
  { name: "APL", type: "programming", extensions: [".apl", ".dyalog"] },
  {
    name: "ASP",
    type: "programming",
    extensions: [".asp", ".asax", ".ascx", ".ashx", ".asmx", ".aspx", ".axd"],
  },
  {
    name: "ATS",
    type: "programming",
    extensions: [".dats", ".hats", ".sats"],
  },
  { name: "ActionScript", type: "programming", extensions: [".as"] },
  {
    name: "Ada",
    type: "programming",
    extensions: [".adb", ".ada", ".ads"],
  },
  { name: "Agda", type: "programming", extensions: [".agda"] },
  { name: "Alloy", type: "programming", extensions: [".als"] },
  {
    name: "ApacheConf",
    type: "markup",
    extensions: [".apacheconf", ".vhost"],
  },
  { name: "Apex", type: "programming", extensions: [".cls"] },
  {
    name: "AppleScript",
    type: "programming",
    extensions: [".applescript", ".scpt"],
  },
  { name: "Arc", type: "programming", extensions: [".arc"] },
  { name: "Arduino", type: "programming", extensions: [".ino"] },
  {
    name: "AsciiDoc",
    type: "prose",
    extensions: [".asciidoc", ".adoc", ".asc"],
  },
  { name: "AspectJ", type: "programming", extensions: [".aj"] },
  {
    name: "Assembly",
    type: "programming",
    extensions: [".asm", ".a51", ".inc", ".nasm"],
  },
  { name: "Augeas", type: "programming", extensions: [".aug"] },
  {
    name: "AutoHotkey",
    type: "programming",
    extensions: [".ahk", ".ahkl"],
  },
  { name: "AutoIt", type: "programming", extensions: [".au3"] },
  {
    name: "Awk",
    type: "programming",
    extensions: [".awk", ".auk", ".gawk", ".mawk", ".nawk"],
  },
  {
    name: "Batchfile",
    type: "programming",
    extensions: [".bat", ".cmd"],
  },
  { name: "Befunge", type: "programming", extensions: [".befunge"] },
  { name: "Bison", type: "programming", extensions: [".bison"] },
  { name: "BitBake", type: "programming", extensions: [".bb"] },
  {
    name: "BlitzBasic",
    type: "programming",
    extensions: [".bb", ".decls"],
  },
  { name: "BlitzMax", type: "programming", extensions: [".bmx"] },
  { name: "Bluespec", type: "programming", extensions: [".bsv"] },
  { name: "Boo", type: "programming", extensions: [".boo"] },
  { name: "Brainfuck", type: "programming", extensions: [".b", ".bf"] },
  { name: "Brightscript", type: "programming", extensions: [".brs"] },
  { name: "Bro", type: "programming", extensions: [".bro"] },
  {
    name: "C",
    type: "programming",
    extensions: [".c", ".cats", ".h", ".idc", ".w"],
  },
  {
    name: "C#",
    type: "programming",
    extensions: [".cs", ".cake", ".cshtml", ".csx"],
  },
  {
    name: "C++",
    type: "programming",
    extensions: [
      ".cpp",
      ".c++",
      ".cc",
      ".cp",
      ".cxx",
      ".h",
      ".h++",
      ".hh",
      ".hpp",
      ".hxx",
      ".inc",
      ".inl",
      ".ipp",
      ".tcc",
      ".tpp",
    ],
  },
  { name: "C-ObjDump", type: "data", extensions: [".c-objdump"] },
  { name: "C2hs Haskell", type: "programming", extensions: [".chs"] },
  { name: "CLIPS", type: "programming", extensions: [".clp"] },
  {
    name: "CMake",
    type: "programming",
    extensions: [".cmake", ".cmake.in"],
  },
  {
    name: "COBOL",
    type: "programming",
    extensions: [".cob", ".cbl", ".ccp", ".cobol", ".cpy"],
  },
  { name: "CSS", type: "markup", extensions: [".css"] },
  { name: "CSV", type: "data", extensions: [".csv"] },
  { name: "Cap'n Proto", type: "programming", extensions: [".capnp"] },
  { name: "CartoCSS", type: "programming", extensions: [".mss"] },
  { name: "Ceylon", type: "programming", extensions: [".ceylon"] },
  { name: "Chapel", type: "programming", extensions: [".chpl"] },
  { name: "Charity", type: "programming", extensions: [".ch"] },
  { name: "ChucK", type: "programming", extensions: [".ck"] },
  { name: "Cirru", type: "programming", extensions: [".cirru"] },
  { name: "Clarion", type: "programming", extensions: [".clw"] },
  { name: "Clean", type: "programming", extensions: [".icl", ".dcl"] },
  { name: "Click", type: "programming", extensions: [".click"] },
  {
    name: "Clojure",
    type: "programming",
    extensions: [
      ".clj",
      ".boot",
      ".cl2",
      ".cljc",
      ".cljs",
      ".cljs.hl",
      ".cljscm",
      ".cljx",
      ".hic",
    ],
  },
  {
    name: "CoffeeScript",
    type: "programming",
    extensions: [".coffee", "._coffee", ".cake", ".cjsx", ".cson", ".iced"],
  },
  {
    name: "ColdFusion",
    type: "programming",
    extensions: [".cfm", ".cfml"],
  },
  { name: "ColdFusion CFC", type: "programming", extensions: [".cfc"] },
  {
    name: "Common Lisp",
    type: "programming",
    extensions: [
      ".lisp",
      ".asd",
      ".cl",
      ".l",
      ".lsp",
      ".ny",
      ".podsl",
      ".sexp",
    ],
  },
  {
    name: "Component Pascal",
    type: "programming",
    extensions: [".cp", ".cps"],
  },
  { name: "Cool", type: "programming", extensions: [".cl"] },
  { name: "Coq", type: "programming", extensions: [".coq", ".v"] },
  {
    name: "Cpp-ObjDump",
    type: "data",
    extensions: [
      ".cppobjdump",
      ".c++-objdump",
      ".c++objdump",
      ".cpp-objdump",
      ".cxx-objdump",
    ],
  },
  { name: "Creole", type: "prose", extensions: [".creole"] },
  { name: "Crystal", type: "programming", extensions: [".cr"] },
  { name: "Cucumber", type: "programming", extensions: [".feature"] },
  { name: "Cuda", type: "programming", extensions: [".cu", ".cuh"] },
  { name: "Cycript", type: "programming", extensions: [".cy"] },
  {
    name: "Cython",
    type: "programming",
    extensions: [".pyx", ".pxd", ".pxi"],
  },
  { name: "D", type: "programming", extensions: [".d", ".di"] },
  { name: "D-ObjDump", type: "data", extensions: [".d-objdump"] },
  {
    name: "DIGITAL Command Language",
    type: "programming",
    extensions: [".com"],
  },
  { name: "DM", type: "programming", extensions: [".dm"] },
  { name: "DNS Zone", type: "data", extensions: [".zone", ".arpa"] },
  { name: "DTrace", type: "programming", extensions: [".d"] },
  {
    name: "Darcs Patch",
    type: "data",
    extensions: [".darcspatch", ".dpatch"],
  },
  { name: "Dart", type: "programming", extensions: [".dart"] },
  { name: "Diff", type: "data", extensions: [".diff", ".patch"] },
  { name: "Dockerfile", type: "data", extensions: [".dockerfile"] },
  { name: "Dogescript", type: "programming", extensions: [".djs"] },
  {
    name: "Dylan",
    type: "programming",
    extensions: [".dylan", ".dyl", ".intr", ".lid"],
  },
  { name: "E", type: "programming", extensions: [".E"] },
  { name: "ECL", type: "programming", extensions: [".ecl", ".eclxml"] },
  { name: "ECLiPSe", type: "programming", extensions: [".ecl"] },
  { name: "Eagle", type: "markup", extensions: [".sch", ".brd"] },
  { name: "Ecere Projects", type: "data", extensions: [".epj"] },
  { name: "Eiffel", type: "programming", extensions: [".e"] },
  { name: "Elixir", type: "programming", extensions: [".ex", ".exs"] },
  { name: "Elm", type: "programming", extensions: [".elm"] },
  {
    name: "Emacs Lisp",
    type: "programming",
    extensions: [".el", ".emacs", ".emacs.desktop"],
  },
  {
    name: "EmberScript",
    type: "programming",
    extensions: [".em", ".emberscript"],
  },
  {
    name: "Erlang",
    type: "programming",
    extensions: [".erl", ".es", ".escript", ".hrl", ".xrl", ".yrl"],
  },
  {
    name: "F#",
    type: "programming",
    extensions: [".fs", ".fsi", ".fsx"],
  },
  { name: "FLUX", type: "programming", extensions: [".fx", ".flux"] },
  {
    name: "FORTRAN",
    type: "programming",
    extensions: [".f90", ".f", ".f03", ".f08", ".f77", ".f95", ".for", ".fpp"],
  },
  { name: "Factor", type: "programming", extensions: [".factor"] },
  {
    name: "Fancy",
    type: "programming",
    extensions: [".fy", ".fancypack"],
  },
  { name: "Fantom", type: "programming", extensions: [".fan"] },
  { name: "Filterscript", type: "programming", extensions: [".fs"] },
  { name: "Formatted", type: "data", extensions: [".for", ".eam.fs"] },
  {
    name: "Forth",
    type: "programming",
    extensions: [".fth", ".4th", ".f", ".for", ".forth", ".fr", ".frt", ".fs"],
  },
  { name: "FreeMarker", type: "programming", extensions: [".ftl"] },
  { name: "Frege", type: "programming", extensions: [".fr"] },
  { name: "G-code", type: "data", extensions: [".g", ".gco", ".gcode"] },
  { name: "GAMS", type: "programming", extensions: [".gms"] },
  {
    name: "GAP",
    type: "programming",
    extensions: [".g", ".gap", ".gd", ".gi", ".tst"],
  },
  { name: "GAS", type: "programming", extensions: [".s", ".ms"] },
  { name: "GDScript", type: "programming", extensions: [".gd"] },
  {
    name: "GLSL",
    type: "programming",
    extensions: [
      ".glsl",
      ".fp",
      ".frag",
      ".frg",
      ".fs",
      ".fsh",
      ".fshader",
      ".geo",
      ".geom",
      ".glslv",
      ".gshader",
      ".shader",
      ".vert",
      ".vrx",
      ".vsh",
      ".vshader",
    ],
  },
  {
    name: "Game Maker Language",
    type: "programming",
    extensions: [".gml"],
  },
  { name: "Genshi", type: "programming", extensions: [".kid"] },
  { name: "Gentoo Ebuild", type: "programming", extensions: [".ebuild"] },
  { name: "Gentoo Eclass", type: "programming", extensions: [".eclass"] },
  { name: "Gettext Catalog", type: "prose", extensions: [".po", ".pot"] },
  { name: "Glyph", type: "programming", extensions: [".glf"] },
  {
    name: "Gnuplot",
    type: "programming",
    extensions: [".gp", ".gnu", ".gnuplot", ".plot", ".plt"],
  },
  { name: "Go", type: "programming", extensions: [".go"] },
  { name: "Golo", type: "programming", extensions: [".golo"] },
  {
    name: "Gosu",
    type: "programming",
    extensions: [".gs", ".gst", ".gsx", ".vark"],
  },
  { name: "Grace", type: "programming", extensions: [".grace"] },
  { name: "Gradle", type: "data", extensions: [".gradle"] },
  {
    name: "Grammatical Framework",
    type: "programming",
    extensions: [".gf"],
  },
  { name: "Graph Modeling Language", type: "data", extensions: [".gml"] },
  { name: "GraphQL", type: "data", extensions: [".graphql"] },
  { name: "Graphviz (DOT)", type: "data", extensions: [".dot", ".gv"] },
  {
    name: "Groff",
    type: "markup",
    extensions: [
      ".man",
      ".1",
      ".1in",
      ".1m",
      ".1x",
      ".2",
      ".3",
      ".3in",
      ".3m",
      ".3qt",
      ".3x",
      ".4",
      ".5",
      ".6",
      ".7",
      ".8",
      ".9",
      ".l",
      ".me",
      ".ms",
      ".n",
      ".rno",
      ".roff",
    ],
  },
  {
    name: "Groovy",
    type: "programming",
    extensions: [".groovy", ".grt", ".gtpl", ".gvy"],
  },
  {
    name: "Groovy Server Pages",
    type: "programming",
    extensions: [".gsp"],
  },
  { name: "HCL", type: "programming", extensions: [".hcl", ".tf"] },
  {
    name: "HLSL",
    type: "programming",
    extensions: [".hlsl", ".fx", ".fxh", ".hlsli"],
  },
  {
    name: "HTML",
    type: "markup",
    extensions: [".html", ".htm", ".html.hl", ".inc", ".st", ".xht", ".xhtml"],
  },
  {
    name: "HTML+Django",
    type: "markup",
    extensions: [".mustache", ".jinja"],
  },
  { name: "HTML+EEX", type: "markup", extensions: [".eex"] },
  {
    name: "HTML+ERB",
    type: "markup",
    extensions: [".erb", ".erb.deface"],
  },
  { name: "HTML+PHP", type: "markup", extensions: [".phtml"] },
  { name: "HTTP", type: "data", extensions: [".http"] },
  { name: "Hack", type: "programming", extensions: [".hh", ".php"] },
  { name: "Haml", type: "markup", extensions: [".haml", ".haml.deface"] },
  {
    name: "Handlebars",
    type: "markup",
    extensions: [".handlebars", ".hbs"],
  },
  { name: "Harbour", type: "programming", extensions: [".hb"] },
  { name: "Haskell", type: "programming", extensions: [".hs", ".hsc"] },
  { name: "Haxe", type: "programming", extensions: [".hx", ".hxsl"] },
  { name: "Hy", type: "programming", extensions: [".hy"] },
  { name: "HyPhy", type: "programming", extensions: [".bf"] },
  { name: "IDL", type: "programming", extensions: [".pro", ".dlm"] },
  { name: "IGOR Pro", type: "programming", extensions: [".ipf"] },
  {
    name: "INI",
    type: "data",
    extensions: [".ini", ".cfg", ".prefs", ".pro", ".properties"],
  },
  {
    name: "IRC log",
    type: "data",
    extensions: [".irclog", ".weechatlog"],
  },
  { name: "Idris", type: "programming", extensions: [".idr", ".lidr"] },
  { name: "Inform 7", type: "programming", extensions: [".ni", ".i7x"] },
  { name: "Inno Setup", type: "programming", extensions: [".iss"] },
  { name: "Io", type: "programming", extensions: [".io"] },
  { name: "Ioke", type: "programming", extensions: [".ik"] },
  { name: "Isabelle", type: "programming", extensions: [".thy"] },
  { name: "J", type: "programming", extensions: [".ijs"] },
  { name: "JFlex", type: "programming", extensions: [".flex", ".jflex"] },
  {
    name: "JSON",
    type: "data",
    extensions: [".json", ".geojson", ".lock", ".topojson"],
  },
  { name: "JSON5", type: "data", extensions: [".json5"] },
  { name: "JSONLD", type: "data", extensions: [".jsonld"] },
  { name: "JSONiq", type: "programming", extensions: [".jq"] },
  { name: "JSX", type: "programming", extensions: [".jsx"] },
  { name: "Jade", type: "markup", extensions: [".jade"] },
  { name: "Jasmin", type: "programming", extensions: [".j"] },
  { name: "Java", type: "programming", extensions: [".java"] },
  {
    name: "Java Server Pages",
    type: "programming",
    extensions: [".jsp"],
  },
  {
    name: "JavaScript",
    type: "programming",
    extensions: [
      ".js",
      "._js",
      ".bones",
      ".es",
      ".es6",
      ".frag",
      ".gs",
      ".jake",
      ".jsb",
      ".jscad",
      ".jsfl",
      ".jsm",
      ".jss",
      ".njs",
      ".pac",
      ".sjs",
      ".ssjs",
      ".sublime-build",
      ".sublime-commands",
      ".sublime-completions",
      ".sublime-keymap",
      ".sublime-macro",
      ".sublime-menu",
      ".sublime-mousemap",
      ".sublime-project",
      ".sublime-settings",
      ".sublime-theme",
      ".sublime-workspace",
      ".sublime_metrics",
      ".sublime_session",
      ".xsjs",
      ".xsjslib",
    ],
  },
  { name: "Julia", type: "programming", extensions: [".jl"] },
  { name: "Jupyter Notebook", type: "markup", extensions: [".ipynb"] },
  { name: "KRL", type: "programming", extensions: [".krl"] },
  {
    name: "KiCad",
    type: "programming",
    extensions: [".sch", ".brd", ".kicad_pcb"],
  },
  { name: "Kit", type: "markup", extensions: [".kit"] },
  {
    name: "Kotlin",
    type: "programming",
    extensions: [".kt", ".ktm", ".kts"],
  },
  { name: "LFE", type: "programming", extensions: [".lfe"] },
  { name: "LLVM", type: "programming", extensions: [".ll"] },
  { name: "LOLCODE", type: "programming", extensions: [".lol"] },
  { name: "LSL", type: "programming", extensions: [".lsl", ".lslp"] },
  { name: "LabVIEW", type: "programming", extensions: [".lvproj"] },
  {
    name: "Lasso",
    type: "programming",
    extensions: [".lasso", ".las", ".lasso8", ".lasso9", ".ldml"],
  },
  { name: "Latte", type: "markup", extensions: [".latte"] },
  { name: "Lean", type: "programming", extensions: [".lean", ".hlean"] },
  { name: "Less", type: "markup", extensions: [".less"] },
  { name: "Lex", type: "programming", extensions: [".l", ".lex"] },
  { name: "LilyPond", type: "programming", extensions: [".ly", ".ily"] },
  { name: "Limbo", type: "programming", extensions: [".b", ".m"] },
  { name: "Linker Script", type: "data", extensions: [".ld", ".lds"] },
  { name: "Linux Kernel Module", type: "data", extensions: [".mod"] },
  { name: "Liquid", type: "markup", extensions: [".liquid"] },
  { name: "Literate Agda", type: "programming", extensions: [".lagda"] },
  {
    name: "Literate CoffeeScript",
    type: "programming",
    extensions: [".litcoffee"],
  },
  { name: "Literate Haskell", type: "programming", extensions: [".lhs"] },
  {
    name: "LiveScript",
    type: "programming",
    extensions: [".ls", "._ls"],
  },
  {
    name: "Logos",
    type: "programming",
    extensions: [".xm", ".x", ".xi"],
  },
  {
    name: "Logtalk",
    type: "programming",
    extensions: [".lgt", ".logtalk"],
  },
  { name: "LookML", type: "programming", extensions: [".lookml"] },
  { name: "LoomScript", type: "programming", extensions: [".ls"] },
  {
    name: "Lua",
    type: "programming",
    extensions: [".lua", ".fcgi", ".nse", ".pd_lua", ".rbxs", ".wlua"],
  },
  { name: "M", type: "programming", extensions: [".mumps", ".m"] },
  { name: "M4", type: "programming", extensions: [".m4"] },
  { name: "M4Sugar", type: "programming", extensions: [".m4"] },
  { name: "MAXScript", type: "programming", extensions: [".ms", ".mcr"] },
  { name: "MTML", type: "markup", extensions: [".mtml"] },
  { name: "MUF", type: "programming", extensions: [".muf", ".m"] },
  {
    name: "Makefile",
    type: "programming",
    extensions: [".mak", ".d", ".mk", ".mkfile"],
  },
  { name: "Mako", type: "programming", extensions: [".mako", ".mao"] },
  {
    name: "Markdown",
    type: "prose",
    extensions: [".md", ".markdown", ".mkd", ".mkdn", ".mkdown", ".ron"],
  },
  { name: "Mask", type: "markup", extensions: [".mask"] },
  {
    name: "Mathematica",
    type: "programming",
    extensions: [
      ".mathematica",
      ".cdf",
      ".m",
      ".ma",
      ".mt",
      ".nb",
      ".nbp",
      ".wl",
      ".wlt",
    ],
  },
  { name: "Matlab", type: "programming", extensions: [".matlab", ".m"] },
  {
    name: "Max",
    type: "programming",
    extensions: [".maxpat", ".maxhelp", ".maxproj", ".mxt", ".pat"],
  },
  {
    name: "MediaWiki",
    type: "prose",
    extensions: [".mediawiki", ".wiki"],
  },
  { name: "Mercury", type: "programming", extensions: [".m", ".moo"] },
  { name: "Metal", type: "programming", extensions: [".metal"] },
  { name: "MiniD", type: "programming", extensions: [".minid"] },
  {
    name: "Mirah",
    type: "programming",
    extensions: [".druby", ".duby", ".mir", ".mirah"],
  },
  { name: "Modelica", type: "programming", extensions: [".mo"] },
  { name: "Modula-2", type: "programming", extensions: [".mod"] },
  {
    name: "Module Management System",
    type: "programming",
    extensions: [".mms", ".mmk"],
  },
  { name: "Monkey", type: "programming", extensions: [".monkey"] },
  { name: "Moocode", type: "programming", extensions: [".moo"] },
  { name: "MoonScript", type: "programming", extensions: [".moon"] },
  { name: "Myghty", type: "programming", extensions: [".myt"] },
  { name: "NCL", type: "programming", extensions: [".ncl"] },
  { name: "NL", type: "data", extensions: [".nl"] },
  { name: "NSIS", type: "programming", extensions: [".nsi", ".nsh"] },
  { name: "Nemerle", type: "programming", extensions: [".n"] },
  { name: "NetLinx", type: "programming", extensions: [".axs", ".axi"] },
  {
    name: "NetLinx+ERB",
    type: "programming",
    extensions: [".axs.erb", ".axi.erb"],
  },
  { name: "NetLogo", type: "programming", extensions: [".nlogo"] },
  {
    name: "NewLisp",
    type: "programming",
    extensions: [".nl", ".lisp", ".lsp"],
  },
  { name: "Nginx", type: "markup", extensions: [".nginxconf", ".vhost"] },
  {
    name: "Nimrod",
    type: "programming",
    extensions: [".nim", ".nimrod"],
  },
  { name: "Ninja", type: "data", extensions: [".ninja"] },
  { name: "Nit", type: "programming", extensions: [".nit"] },
  { name: "Nix", type: "programming", extensions: [".nix"] },
  { name: "Nu", type: "programming", extensions: [".nu"] },
  {
    name: "NumPy",
    type: "programming",
    extensions: [".numpy", ".numpyw", ".numsc"],
  },
  {
    name: "OCaml",
    type: "programming",
    extensions: [".ml", ".eliom", ".eliomi", ".ml4", ".mli", ".mll", ".mly"],
  },
  { name: "ObjDump", type: "data", extensions: [".objdump"] },
  { name: "Objective-C", type: "programming", extensions: [".m", ".h"] },
  { name: "Objective-C++", type: "programming", extensions: [".mm"] },
  { name: "Objective-J", type: "programming", extensions: [".j", ".sj"] },
  { name: "Omgrofl", type: "programming", extensions: [".omgrofl"] },
  { name: "Opa", type: "programming", extensions: [".opa"] },
  { name: "Opal", type: "programming", extensions: [".opal"] },
  { name: "OpenCL", type: "programming", extensions: [".cl", ".opencl"] },
  {
    name: "OpenEdge ABL",
    type: "programming",
    extensions: [".p", ".cls"],
  },
  { name: "OpenSCAD", type: "programming", extensions: [".scad"] },
  { name: "Org", type: "prose", extensions: [".org"] },
  {
    name: "Ox",
    type: "programming",
    extensions: [".ox", ".oxh", ".oxo"],
  },
  { name: "Oxygene", type: "programming", extensions: [".oxygene"] },
  { name: "Oz", type: "programming", extensions: [".oz"] },
  { name: "PAWN", type: "programming", extensions: [".pwn", ".inc"] },
  {
    name: "PHP",
    type: "programming",
    extensions: [
      ".php",
      ".aw",
      ".ctp",
      ".fcgi",
      ".inc",
      ".php3",
      ".php4",
      ".php5",
      ".phps",
      ".phpt",
    ],
  },
  {
    name: "PLSQL",
    type: "programming",
    extensions: [".pls", ".pck", ".pkb", ".pks", ".plb", ".plsql", ".sql"],
  },
  { name: "PLpgSQL", type: "programming", extensions: [".sql"] },
  {
    name: "POV-Ray SDL",
    type: "programming",
    extensions: [".pov", ".inc"],
  },
  { name: "Pan", type: "programming", extensions: [".pan"] },
  { name: "Papyrus", type: "programming", extensions: [".psc"] },
  { name: "Parrot", type: "programming", extensions: [".parrot"] },
  { name: "Parrot Assembly", type: "programming", extensions: [".pasm"] },
  {
    name: "Parrot Internal Representation",
    type: "programming",
    extensions: [".pir"],
  },
  {
    name: "Pascal",
    type: "programming",
    extensions: [".pas", ".dfm", ".dpr", ".inc", ".lpr", ".pp"],
  },
  {
    name: "Perl",
    type: "programming",
    extensions: [
      ".pl",
      ".al",
      ".cgi",
      ".fcgi",
      ".perl",
      ".ph",
      ".plx",
      ".pm",
      ".pod",
      ".psgi",
      ".t",
    ],
  },
  {
    name: "Perl6",
    type: "programming",
    extensions: [
      ".6pl",
      ".6pm",
      ".nqp",
      ".p6",
      ".p6l",
      ".p6m",
      ".pl",
      ".pl6",
      ".pm",
      ".pm6",
      ".t",
    ],
  },
  { name: "Pickle", type: "data", extensions: [".pkl"] },
  { name: "PicoLisp", type: "programming", extensions: [".l"] },
  { name: "PigLatin", type: "programming", extensions: [".pig"] },
  { name: "Pike", type: "programming", extensions: [".pike", ".pmod"] },
  { name: "Pod", type: "prose", extensions: [".pod"] },
  { name: "PogoScript", type: "programming", extensions: [".pogo"] },
  { name: "Pony", type: "programming", extensions: [".pony"] },
  { name: "PostScript", type: "markup", extensions: [".ps", ".eps"] },
  {
    name: "PowerShell",
    type: "programming",
    extensions: [".ps1", ".psd1", ".psm1"],
  },
  { name: "Processing", type: "programming", extensions: [".pde"] },
  {
    name: "Prolog",
    type: "programming",
    extensions: [".pl", ".pro", ".prolog", ".yap"],
  },
  { name: "Propeller Spin", type: "programming", extensions: [".spin"] },
  { name: "Protocol Buffer", type: "markup", extensions: [".proto"] },
  { name: "Public Key", type: "data", extensions: [".asc", ".pub"] },
  { name: "Puppet", type: "programming", extensions: [".pp"] },
  { name: "Pure Data", type: "programming", extensions: [".pd"] },
  { name: "PureBasic", type: "programming", extensions: [".pb", ".pbi"] },
  { name: "PureScript", type: "programming", extensions: [".purs"] },
  {
    name: "Python",
    type: "programming",
    extensions: [
      ".py",
      ".bzl",
      ".cgi",
      ".fcgi",
      ".gyp",
      ".lmi",
      ".pyde",
      ".pyp",
      ".pyt",
      ".pyw",
      ".rpy",
      ".tac",
      ".wsgi",
      ".xpy",
    ],
  },
  { name: "Python traceback", type: "data", extensions: [".pytb"] },
  { name: "QML", type: "programming", extensions: [".qml", ".qbs"] },
  { name: "QMake", type: "programming", extensions: [".pro", ".pri"] },
  { name: "R", type: "programming", extensions: [".r", ".rd", ".rsx"] },
  { name: "RAML", type: "markup", extensions: [".raml"] },
  { name: "RDoc", type: "prose", extensions: [".rdoc"] },
  {
    name: "REALbasic",
    type: "programming",
    extensions: [
      ".rbbas",
      ".rbfrm",
      ".rbmnu",
      ".rbres",
      ".rbtbar",
      ".rbuistate",
    ],
  },
  { name: "RHTML", type: "markup", extensions: [".rhtml"] },
  { name: "RMarkdown", type: "prose", extensions: [".rmd"] },
  {
    name: "Racket",
    type: "programming",
    extensions: [".rkt", ".rktd", ".rktl", ".scrbl"],
  },
  {
    name: "Ragel in Ruby Host",
    type: "programming",
    extensions: [".rl"],
  },
  { name: "Raw token data", type: "data", extensions: [".raw"] },
  {
    name: "Rebol",
    type: "programming",
    extensions: [".reb", ".r", ".r2", ".r3", ".rebol"],
  },
  { name: "Red", type: "programming", extensions: [".red", ".reds"] },
  { name: "Redcode", type: "programming", extensions: [".cw"] },
  { name: "Ren'Py", type: "programming", extensions: [".rpy"] },
  {
    name: "RenderScript",
    type: "programming",
    extensions: [".rs", ".rsh"],
  },
  { name: "RobotFramework", type: "programming", extensions: [".robot"] },
  { name: "Rouge", type: "programming", extensions: [".rg"] },
  {
    name: "Ruby",
    type: "programming",
    extensions: [
      ".rb",
      ".builder",
      ".fcgi",
      ".gemspec",
      ".god",
      ".irbrc",
      ".jbuilder",
      ".mspec",
      ".pluginspec",
      ".podspec",
      ".rabl",
      ".rake",
      ".rbuild",
      ".rbw",
      ".rbx",
      ".ru",
      ".ruby",
      ".thor",
      ".watchr",
    ],
  },
  { name: "Rust", type: "programming", extensions: [".rs", ".rs.in"] },
  { name: "SAS", type: "programming", extensions: [".sas"] },
  { name: "SCSS", type: "markup", extensions: [".scss"] },
  { name: "SMT", type: "programming", extensions: [".smt2", ".smt"] },
  { name: "SPARQL", type: "data", extensions: [".sparql", ".rq"] },
  { name: "SQF", type: "programming", extensions: [".sqf", ".hqf"] },
  {
    name: "SQL",
    type: "data",
    extensions: [
      ".sql",
      ".cql",
      ".ddl",
      ".inc",
      ".prc",
      ".tab",
      ".udf",
      ".viw",
    ],
  },
  { name: "SQLPL", type: "programming", extensions: [".sql", ".db2"] },
  { name: "STON", type: "data", extensions: [".ston"] },
  { name: "SVG", type: "data", extensions: [".svg"] },
  { name: "Sage", type: "programming", extensions: [".sage", ".sagews"] },
  { name: "SaltStack", type: "programming", extensions: [".sls"] },
  { name: "Sass", type: "markup", extensions: [".sass"] },
  {
    name: "Scala",
    type: "programming",
    extensions: [".scala", ".sbt", ".sc"],
  },
  { name: "Scaml", type: "markup", extensions: [".scaml"] },
  {
    name: "Scheme",
    type: "programming",
    extensions: [".scm", ".sld", ".sls", ".sps", ".ss"],
  },
  {
    name: "Scilab",
    type: "programming",
    extensions: [".sci", ".sce", ".tst"],
  },
  { name: "Self", type: "programming", extensions: [".self"] },
  {
    name: "Shell",
    type: "programming",
    extensions: [
      ".sh",
      ".bash",
      ".bats",
      ".cgi",
      ".command",
      ".fcgi",
      ".ksh",
      ".sh.in",
      ".tmux",
      ".tool",
      ".zsh",
    ],
  },
  {
    name: "ShellSession",
    type: "programming",
    extensions: [".sh-session"],
  },
  { name: "Shen", type: "programming", extensions: [".shen"] },
  { name: "Slash", type: "programming", extensions: [".sl"] },
  { name: "Slim", type: "markup", extensions: [".slim"] },
  { name: "Smali", type: "programming", extensions: [".smali"] },
  { name: "Smalltalk", type: "programming", extensions: [".st", ".cs"] },
  { name: "Smarty", type: "programming", extensions: [".tpl"] },
  {
    name: "SourcePawn",
    type: "programming",
    extensions: [".sp", ".inc", ".sma"],
  },
  { name: "Squirrel", type: "programming", extensions: [".nut"] },
  { name: "Stan", type: "programming", extensions: [".stan"] },
  {
    name: "Standard ML",
    type: "programming",
    extensions: [".ML", ".fun", ".sig", ".sml"],
  },
  {
    name: "Stata",
    type: "programming",
    extensions: [".do", ".ado", ".doh", ".ihlp", ".mata", ".matah", ".sthlp"],
  },
  { name: "Stylus", type: "markup", extensions: [".styl"] },
  {
    name: "SuperCollider",
    type: "programming",
    extensions: [".sc", ".scd"],
  },
  { name: "Swift", type: "programming", extensions: [".swift"] },
  {
    name: "SystemVerilog",
    type: "programming",
    extensions: [".sv", ".svh", ".vh"],
  },
  { name: "TOML", type: "data", extensions: [".toml"] },
  { name: "TXL", type: "programming", extensions: [".txl"] },
  {
    name: "Tcl",
    type: "programming",
    extensions: [".tcl", ".adp", ".tm"],
  },
  { name: "Tcsh", type: "programming", extensions: [".tcsh", ".csh"] },
  {
    name: "TeX",
    type: "markup",
    extensions: [
      ".tex",
      ".aux",
      ".bbx",
      ".bib",
      ".cbx",
      ".cls",
      ".dtx",
      ".ins",
      ".lbx",
      ".ltx",
      ".mkii",
      ".mkiv",
      ".mkvi",
      ".sty",
      ".toc",
    ],
  },
  { name: "Tea", type: "markup", extensions: [".tea"] },
  { name: "Terra", type: "programming", extensions: [".t"] },
  {
    name: "Text",
    type: "prose",
    extensions: [".txt", ".fr", ".nb", ".ncl", ".no"],
  },
  { name: "Textile", type: "prose", extensions: [".textile"] },
  { name: "Thrift", type: "programming", extensions: [".thrift"] },
  { name: "Turing", type: "programming", extensions: [".t", ".tu"] },
  { name: "Turtle", type: "data", extensions: [".ttl"] },
  { name: "Twig", type: "markup", extensions: [".twig"] },
  {
    name: "TypeScript",
    type: "programming",
    extensions: [".ts", ".tsx"],
  },
  {
    name: "Unified Parallel C",
    type: "programming",
    extensions: [".upc"],
  },
  {
    name: "Unity3D Asset",
    type: "data",
    extensions: [".anim", ".asset", ".mat", ".meta", ".prefab", ".unity"],
  },
  { name: "Uno", type: "programming", extensions: [".uno"] },
  { name: "UnrealScript", type: "programming", extensions: [".uc"] },
  { name: "UrWeb", type: "programming", extensions: [".ur", ".urs"] },
  { name: "VCL", type: "programming", extensions: [".vcl"] },
  {
    name: "VHDL",
    type: "programming",
    extensions: [
      ".vhdl",
      ".vhd",
      ".vhf",
      ".vhi",
      ".vho",
      ".vhs",
      ".vht",
      ".vhw",
    ],
  },
  { name: "Vala", type: "programming", extensions: [".vala", ".vapi"] },
  { name: "Verilog", type: "programming", extensions: [".v", ".veo"] },
  { name: "VimL", type: "programming", extensions: [".vim"] },
  {
    name: "Visual Basic",
    type: "programming",
    extensions: [
      ".vb",
      ".bas",
      ".cls",
      ".frm",
      ".frx",
      ".vba",
      ".vbhtml",
      ".vbs",
    ],
  },
  { name: "Volt", type: "programming", extensions: [".volt"] },
  { name: "Vue", type: "markup", extensions: [".vue"] },
  { name: "Web Ontology Language", type: "markup", extensions: [".owl"] },
  { name: "WebIDL", type: "programming", extensions: [".webidl"] },
  { name: "X10", type: "programming", extensions: [".x10"] },
  { name: "XC", type: "programming", extensions: [".xc"] },
  {
    name: "XML",
    type: "data",
    extensions: [
      ".xml",
      ".ant",
      ".axml",
      ".ccxml",
      ".clixml",
      ".cproject",
      ".csl",
      ".csproj",
      ".ct",
      ".dita",
      ".ditamap",
      ".ditaval",
      ".dll.config",
      ".dotsettings",
      ".filters",
      ".fsproj",
      ".fxml",
      ".glade",
      ".gml",
      ".grxml",
      ".iml",
      ".ivy",
      ".jelly",
      ".jsproj",
      ".kml",
      ".launch",
      ".mdpolicy",
      ".mm",
      ".mod",
      ".mxml",
      ".nproj",
      ".nuspec",
      ".odd",
      ".osm",
      ".plist",
      ".pluginspec",
      ".props",
      ".ps1xml",
      ".psc1",
      ".pt",
      ".rdf",
      ".rss",
      ".scxml",
      ".srdf",
      ".storyboard",
      ".stTheme",
      ".sublime-snippet",
      ".targets",
      ".tmCommand",
      ".tml",
      ".tmLanguage",
      ".tmPreferences",
      ".tmSnippet",
      ".tmTheme",
      ".ts",
      ".tsx",
      ".ui",
      ".urdf",
      ".ux",
      ".vbproj",
      ".vcxproj",
      ".vssettings",
      ".vxml",
      ".wsdl",
      ".wsf",
      ".wxi",
      ".wxl",
      ".wxs",
      ".x3d",
      ".xacro",
      ".xaml",
      ".xib",
      ".xlf",
      ".xliff",
      ".xmi",
      ".xml.dist",
      ".xproj",
      ".xsd",
      ".xul",
      ".zcml",
    ],
  },
  {
    name: "XPages",
    type: "programming",
    extensions: [".xsp-config", ".xsp.metadata"],
  },
  { name: "XProc", type: "programming", extensions: [".xpl", ".xproc"] },
  {
    name: "XQuery",
    type: "programming",
    extensions: [".xquery", ".xq", ".xql", ".xqm", ".xqy"],
  },
  { name: "XS", type: "programming", extensions: [".xs"] },
  { name: "XSLT", type: "programming", extensions: [".xslt", ".xsl"] },
  {
    name: "Xojo",
    type: "programming",
    extensions: [
      ".xojo_code",
      ".xojo_menu",
      ".xojo_report",
      ".xojo_script",
      ".xojo_toolbar",
      ".xojo_window",
    ],
  },
  { name: "Xtend", type: "programming", extensions: [".xtend"] },
  {
    name: "YAML",
    type: "data",
    extensions: [
      ".yml",
      ".reek",
      ".rviz",
      ".sublime-syntax",
      ".syntax",
      ".yaml",
      ".yaml-tmlanguage",
    ],
  },
  { name: "YANG", type: "data", extensions: [".yang"] },
  {
    name: "Yacc",
    type: "programming",
    extensions: [".y", ".yacc", ".yy"],
  },
  { name: "Zephir", type: "programming", extensions: [".zep"] },
  {
    name: "Zimpl",
    type: "programming",
    extensions: [".zimpl", ".zmpl", ".zpl"],
  },
  {
    name: "desktop",
    type: "data",
    extensions: [".desktop", ".desktop.in"],
  },
  { name: "eC", type: "programming", extensions: [".ec", ".eh"] },
  { name: "edn", type: "data", extensions: [".edn"] },
  { name: "fish", type: "programming", extensions: [".fish"] },
  { name: "mupad", type: "programming", extensions: [".mu"] },
  { name: "nesC", type: "programming", extensions: [".nc"] },
  { name: "ooc", type: "programming", extensions: [".ooc"] },
  {
    name: "reStructuredText",
    type: "prose",
    extensions: [".rst", ".rest", ".rest.txt", ".rst.txt"],
  },
  { name: "wisp", type: "programming", extensions: [".wisp"] },
  {
    name: "xBase",
    type: "programming",
    extensions: [".prg", ".ch", ".prw"],
  },
];

let processedFilesTemp;
let doc;
const genId = () => {
  return `${Date.now()}__${Math.floor(Math.random() * 10000)}`;
};

let i = 0;
const FileTree = ({ files, setFiles, setProcessedFiles, updateFiles,getCurrentFile }) => {
  const [prcsdFiles, setPrcsdFiles] = useState();
  const [filesUpdated, setFilesUpdated] = useState();
  const [newItem, setNewItem] = useState();
  const [reRender, setRerender] = useState(true);

  useEffect(() => {
    if (newItem) {
      let optIcons = document.querySelectorAll("." + styles.optIcon);
      for (let i = 0; i < optIcons.length; i++) {
        optIcons[i].addEventListener("click", fileOpts);
        ReactDOM.render(<FaEllipsisV />, optIcons[i]);
      }
      /* let mnc = document.querySelectorAll("." + styles.mainNodeChild);
      for (i = 0; i < mnc.length; i++) {
        mnc[i].addEventListener("click", funco);
      }
*/
      newItem[0].addEventListener("click", funco);
      newItem.click();
    }
  }, [newItem]);

  useEffect(() => {
    if (files) {
      let pFiles = processFiles(expandFiles(files));
      pFiles.sort((a, b) =>
        a.file.name.toLowerCase() > b.file.name.toLowerCase()
          ? 1
          : b.file.name.toLowerCase() > a.file.name.toLowerCase()
          ? -1
          : 0
      );
      //setRerender(true)
      setPrcsdFiles(pFiles);
      processedFilesTemp = pFiles;
    }
  }, [files]);

  useEffect(() => {
    if (prcsdFiles) {
      setProcessedFiles && setProcessedFiles(prcsdFiles);

      let openNodes = document.querySelectorAll("." + styles.open);
      let oNodes = [];
      for (let i = 0; i < openNodes.length; i++) {
        oNodes.push(openNodes[i].dataset.id);
      }

      if (!filesUpdated && reRender !== false) {
        //clearNode();
        renderTreeV2(prcsdFiles).then((r) => {
          let nodes = document.querySelectorAll("." + styles.node);
          let mainNodes = document.querySelectorAll("." + styles.mainNodeChild);

          try {
            let mnc = document.querySelectorAll("." + styles.mainNodeChild);
            for (i = 0; i < mnc.length; i++) {
              mnc[i].addEventListener("click", funco);
            }
            let optIcons = document.querySelectorAll("." + styles.optIcon);
            for (let i = 0; i < optIcons.length; i++) {
              optIcons[i].addEventListener("click", fileOpts);
            }
            /*setInterval(() => {
              let mnc = document.querySelectorAll("." + styles.mainNodeChild);
              for (i = 0; i < mnc.length; i++) {
                mnc[i].addEventListener("click", funco);
              }

              let optIcons = document.querySelectorAll("." + styles.optIcon);
    for (let i = 0; i < optIcons.length; i++) {
      optIcons[i].addEventListener("click", fileOpts)
    }
            }, 100);*/
          } catch (e) {
            console.log("Fucked up..");
          }
          $(mainNodes[0]).click();
        });
      }
    }
  }, [prcsdFiles]);

  useEffect(() => {
    doc = document;
  }, []);
  useEffect(() => {
    if (newItem) {
      $(newItem).click((e) => {
        mainNodeChild(e);
      });
      newItem.click();
    }
  }, [newItem]);

  const clearNode = () => {
    const NODE = document.querySelector("." + styles.root);
    NODE.innerHTML = "";
  };

  // The render method
  const renderTreeV2 = async (files) => {
    const render = (files) => {
      let nodes = document.querySelectorAll("." + styles.node);

      files.forEach((file) => {
        let theFile = file["file"];
        let li = document.createElement("li");
        let ul = document.createElement("ul");
        let html = "";
        if (theFile.children) {
          html += `<div class="${styles.folder}">
                            <div data-id=${theFile.id} class="${styles.mainNodeChild}">
                            
                            <span class="${styles.icon} ${styles.folderIcon}" id="${theFile.id}" data-type="folder"></span> &nbsp;
                            <span class="${styles.foldername}" data-parent="${file.parent.id}">${theFile.name}</span>
                            </div>
                            <span data-id=${theFile.id} class="${styles.iconContainer} ${styles.fileOpts} inactive">
                            <span class="${styles.icon} ${styles.optIcon}"></span>
                            
                        </span>
                        </div>
                        `;
          li.innerHTML = html;

          $(ul).addClass(styles.closed);
          $(ul).addClass(styles.node);

          ul.dataset.id = theFile.id;
          li.appendChild(ul);
        } else {
          html += `
        <div class="${styles.file}">
        <div data-id=${theFile.id} class="${styles.mainNodeChild}">
              <span id="${theFile.id}" 
              style="display: flex;
              align-items: center;"
          class="${styles.icon}" data-type="file"></span>&nbsp;
              <span class="${styles.filename}"  data-parent="${file.parent.id}" title="${theFile.name}">${theFile.name}</span>
              </div>
              <span data-id=${theFile.id} class="${styles.iconContainer} ${styles.fileOpts} inactive">
                      <span class="${styles.icon} ${styles.optIcon}"></span>
                  </span>
                  </div>
                
                  `;

          li.innerHTML = html;

          //$(li).addClass(styles.file);
        }

        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].dataset.id === file.parent.id) {
            li.dataset.parent = file.parent.id;
            nodes[i].appendChild(li);
            let iconNode = document.getElementById(`${theFile.id}`);
            iconNode && iconNode.dataset.type === "file"
              ? ReactDOM.render(<AiFillFile key={theFile.id} />, iconNode)
              : ReactDOM.render(
                  <BsFillFolderFill key={theFile.id} />,
                  iconNode
                );
          }
        }

        if (theFile.children) {
          theFile.children.forEach((child) => {
            let ff = files.filter((file) => file.file.id === child.id);
            if (ff.length) render(ff);
          });
        }
      });
    };

    render(files);
    let demoDOM = <h1>hEY IM DOM</h1>;

    let chevIcons = document.querySelectorAll("." + styles.chevIcon);
    for (let i = 0; i < chevIcons.length; i++) {
      ReactDOM.render(<MdKeyboardArrowRight />, chevIcons[i]);
    }
    let optIcons = document.querySelectorAll("." + styles.optIcon);
    for (let i = 0; i < optIcons.length; i++) {
      ReactDOM.render(<FaEllipsisV />, optIcons[i]);
    }
  };

  const gCF = (id) => {
    let pFiles = processFiles(expandFiles(files));
    let currentFile = pFiles.filter((file) => file.file.id === id)[0];
    if (currentFile && getCurrentFile)
      {!currentFile.file.children && getCurrentFile(currentFile.file)
      };
      
  };

  const mainNodeChild = (e) => {
    if ($(e.currentTarget.parentElement).hasClass(styles.file)) {
      $(`.${styles.mainNodeChild}`).removeClass(styles.current);
      $(e.currentTarget).addClass(styles.current);
    }
    let id = e.currentTarget.dataset.id;
    gCF(id);
    let chevron = $(
      e.currentTarget.parentElement.querySelector("." + styles.chevIcon)
    );
    //getFilename(id);
    if (!$(e.currentTarget.parentElement).hasClass(styles.selected)) {
      $(`.${styles.folder}, .${styles.file}`).removeClass(styles.selected);

      $(e.currentTarget.parentElement).addClass(styles.selected);
      chevron.hasClass(styles.active)
        ? chevron.removeClass(styles.active)
        : chevron.addClass(styles.active);
    } else {
      chevron.hasClass(styles.active)
        ? chevron.removeClass(styles.active)
        : chevron.addClass(styles.active);
    }

    // ExpandMore

    let kid = e.currentTarget.parentElement.parentElement.querySelector("ul");

    kid = $(kid);
    if ($(e.currentTarget.parentElement).hasClass(styles.folder)) {
      if (kid.hasClass(styles.open)) {
        kid.addClass(styles.closed);
        kid.removeClass(styles.open);
      } else if (kid.hasClass(styles.closed)) {
        kid.removeClass(styles.closed);
        kid.addClass(styles.open);
      }
    }
  };
  const funco = (e) => {
    if ($(e.currentTarget.parentElement).hasClass(styles.file)) {
      $(`.${styles.mainNodeChild}`).removeClass(styles.current);
      $(e.currentTarget).addClass(styles.current);
    }
    let id = e.currentTarget.dataset.id;
    gCF(id);
    let chevron = $(
      e.currentTarget.parentElement.querySelector("." + styles.chevIcon)
    );
    //getFilename(id);
    if (!$(e.currentTarget.parentElement).hasClass(styles.selected)) {
      $(`.${styles.folder}, .${styles.file}`).removeClass(styles.selected);

      $(e.currentTarget.parentElement).addClass(styles.selected);
      chevron.hasClass(styles.active)
        ? chevron.removeClass(styles.active)
        : chevron.addClass(styles.active);
    } else {
      chevron.hasClass(styles.active)
        ? chevron.removeClass(styles.active)
        : chevron.addClass(styles.active);
    }

    // ExpandMore

    let kid = e.currentTarget.parentElement.parentElement.querySelector("ul");

    kid = $(kid);
    let folderIconNode = e.currentTarget.parentElement.querySelector(
      "." + styles.folderIcon
    );
    if ($(e.currentTarget.parentElement).hasClass(styles.folder)) {
      if (kid.hasClass(styles.open)) {
        kid.addClass(styles.closed);
        kid.removeClass(styles.open);
        $(folderIconNode).removeClass(styles.openFolder);
        ReactDOM.render(<BsFillFolderFill />, folderIconNode);
      } else if (kid.hasClass(styles.closed)) {
        kid.removeClass(styles.closed);
        kid.addClass(styles.open);
        //folderIconNode.innerHTML = ''
        $(folderIconNode).addClass(styles.openFolder);
        ReactDOM.render(<AiFillFolderOpen />, folderIconNode);
      }
    }
    //e.target.removeEventListener("click", funco); bbbbbbbbbbbbbbb
  };
  const eventListeners = () => {
    document.addEventListener("click", (e) => {
      let mainNodeChilds = doc.querySelectorAll(`.${styles.mainNodeChild}`);
      for (let i = 0; i < mainNodeChilds.length; i++) {
        mainNodeChilds[i].addEventListener("click", funco);
      }
    });
    if (true) {
      const func = (e) => {
        if ($(e.currentTarget.parentElement).hasClass(styles.file)) {
          $(`.${styles.mainNodeChild}`).removeClass(styles.current);
          $(e.currentTarget).addClass(styles.current);
        }
        let id = e.currentTarget.dataset.id;
        gCF(id);
        let chevron = $(
          e.currentTarget.parentElement.querySelector("." + styles.chevIcon)
        );
        //getFilename(id);
        if (!$(e.currentTarget.parentElement).hasClass(styles.selected)) {
          $(`.${styles.folder}, .${styles.file}`).removeClass(styles.selected);

          $(e.currentTarget.parentElement).addClass(styles.selected);
          chevron.hasClass(styles.active)
            ? chevron.removeClass(styles.active)
            : chevron.addClass(styles.active);
        } else {
          chevron.hasClass(styles.active)
            ? chevron.removeClass(styles.active)
            : chevron.addClass(styles.active);
        }

        // ExpandMore

        let kid = e.currentTarget.parentElement.parentElement.querySelector(
          "ul"
        );

        kid = $(kid);
        let folderIconNode = e.currentTarget.parentElement.querySelector(
          "." + styles.folderIcon
        );
        if ($(e.currentTarget.parentElement).hasClass(styles.folder)) {
          if (kid.hasClass(styles.open)) {
            kid.addClass(styles.closed);
            kid.removeClass(styles.open);
            $(folderIconNode).removeClass(styles.openFolder);
            ReactDOM.render(<BsFillFolderFill />, folderIconNode);
          } else if (kid.hasClass(styles.closed)) {
            kid.removeClass(styles.closed);
            kid.addClass(styles.open);
            //folderIconNode.innerHTML = ''
            $(folderIconNode).addClass(styles.openFolder);
            ReactDOM.render(<AiFillFolderOpen />, folderIconNode);
          }
        }
      };


      $(`.${styles.mainNodeChild}`).click((e) => {});
      $("." + styles.fileOpts).click((e) => {
        fileOpts(e);
      });
    }
  };

  const expandFiles = (files) => {
    let expandedFiles = [];
    const expand = (files) => {
      files.forEach((file) => {
        if (file.children) {
          let childIds = [];
          file.children.forEach((child) => {
            childIds.push(child.id);
            if (child.children) {
              //expand(child.children)
            }
          });

          //file.childIDs = childIds

          expandedFiles.push(file);
          expand(file.children);
        } else {
          expandedFiles.push(file);
        }
      });
    };
    expand(files);
    return expandedFiles;
  };

  const processFiles = (files) => {
    let prcsdFiles = [];
    files.forEach((file) => {
      let fileId = file.id;
      let parent = files.filter(
        (file001) =>
          file001.children &&
          file001.children.filter((child) => child.id === fileId)[0]
      )[0]
        ? files.filter(
            (file001) =>
              file001.children &&
              file001.children.filter((child) => child.id === fileId)[0]
          )[0]
        : { id: "root" };

      prcsdFiles.push({ file, parent });
    });

    return prcsdFiles;
  };

  const fileOpts = (e) => {
    const fileId = e.currentTarget.parentElement.dataset.id;
    const file = expandFiles(files).find(({ id }) => id === fileId);

    $(e.currentTarget).addClass(styles.active);
    $("." + styles.opts).remove();
    let opts = document.createElement("div");
    $(opts).addClass(styles.opts);
    $(opts).html(`
          <div class="${styles.opt}">
          <span class="tb-rnm">Rename</span>
          </div><div class="${styles.opt}">
          <span class="tb-dld text-">Download</span>
          </div>
          <div class="${styles.opt}">
          <span class="tb-del text-danger">Delete</span>
          </div>
          `);
    e.currentTarget.parentElement.parentElement.appendChild(opts);

    $(".tb-del").click((ev) => {
      let fileNode =
          ev.currentTarget.parentElement.parentElement.parentElement
            .parentElement,
        ulNode = fileNode.parentElement,
        fileType,
        fileNameNode;
      let fileNode001 =
        ev.currentTarget.parentElement.parentElement.parentElement;
      if ($(fileNode001).hasClass(styles.file)) {
        fileType = "file";
        fileNameNode = fileNode001.querySelector("." + styles.filename);
      } else {
        fileType = "folder";
        fileNameNode = fileNode001.querySelector("." + styles.foldername);
      }

      let r = confirm(
        "Are you sure you want to delete " + fileNameNode.innerText
      );

      if (r) {
        let fileId = fileNameNode.parentElement.dataset.id;
        let pFiles = processedFilesTemp;
        let initFile = pFiles.filter((f) => f.file.id === fileId)[0];

        const rmvFile = (file) => {
          if (file) {
            let removedFile = pFiles.filter(
              (f) => f.file.id === file.file.id
            )[0];
            pFiles = pFiles.filter((f) => f.file.id !== file.file.id);

            if (removedFile.file.children) {
              removedFile.file.children.forEach((child) => {
                let childFile = pFiles.filter((f) => f.file.id === child.id)[0];
                rmvFile(childFile);
              });
            }
          }
        };

        rmvFile(initFile);

        setRerender(false);
        setPrcsdFiles(pFiles);
        processedFilesTemp = pFiles;
        //processedFilesTemp.forEach(f=> console.log(f.file.name))
        setFiles(reverseEngineerFiles(pFiles));
        let lis = ulNode.querySelectorAll("li");
        let llis = [].filter.call(
          lis,
          (li) => li.dataset.parent === fileNode.dataset.parent
        );
        let nodePos = llis.indexOf(fileNode);

        setProcessedFiles && setProcessedFiles(remFiles);
        $(fileNode).remove();
        //click next Eleme

        lis = ulNode.querySelectorAll("li");
        lis = [].filter.call(
          lis,
          (li) => li.dataset.parent === fileNode.dataset.parent
        );
        let selected = fileNode.querySelector("." + styles.selected);
        if (lis.length) {
          if (selected && lis[nodePos - 1]) {
            $(
              lis[nodePos - 1].querySelector("." + styles.mainNodeChild)
            ).click();
          } else if (!lis[nodePos - 1] && selected) {
            $(ulNode.querySelector("." + styles.mainNodeChild)).click();
          }
        } else {
          $(
            ulNode.parentElement.querySelector("." + styles.mainNodeChild)
          ).click();
        }

        //fileNode.querySelector('.' + styles.selected) && $((lis[lis.length - 1]).querySelector('.' + styles.mainNodeChild)).click()
      }
    });

    $(".tb-rnm").click((ev) => {
      let fileNode =
          ev.currentTarget.parentElement.parentElement.parentElement
            .parentElement,
        fileType,
        fileNameNode;
      let fileNode2 =
        ev.currentTarget.parentElement.parentElement.parentElement;
      if ($(fileNode2).hasClass(styles.file)) {
        fileType = "file";
        fileNameNode = fileNode2.querySelector("." + styles.filename);
      } else if ($(fileNode2).hasClass(styles.folder)) {
        fileType = "folder";
        fileNameNode = fileNode.querySelector("." + styles.foldername);
      }

      let fileId = fileNameNode.parentElement.dataset.id;

      let icon = fileNode2.querySelector("." + styles.icon);
      //remove the options
      $("." + styles.opts).remove();
      //hide the innerHtml of the node
      $(fileNode2.querySelector("." + styles.mainNodeChild)).addClass(
        styles.dnone
      );
      $(fileNode2.querySelector("." + styles.iconContainer)).addClass(
        styles.dnone
      );

      let inp = document.createElement("input"),
        div = document.createElement("div"),
        span = document.createElement("span");

      let ogSpan = fileNode.querySelector("." + styles.icon);
      $(div).addClass(styles.dflex);
      $(div).addClass(styles.m0);
      $(div).addClass(styles.jscb);
      $(div).addClass(styles.ptb0);
      $(div).css("width", "100%");
      span.classList = ogSpan.classList;
      span.innerHTML = icon.innerHTML;

      $(div).hover(
        (e) => {
          $(div).css("background", "transparent");
        },
        (e) => {}
      );

      inp.value = fileNameNode.innerText;
      $(inp).addClass(styles.inp);
      div.appendChild(span);
      $(span).addClass(styles.addon);
      div.appendChild(inp);
      //Append a temp inp el to the node
      fileNode2.appendChild(div);
      inp.select();
      inp.focus();

      const renameFile = () => {
        let filename = inp.value;
        fileNameNode.innerText = filename;
        fileNameNode.title = filename;

        //update files
        let pFiles = processedFilesTemp; //processFiles(expandFiles(files));
        let updatedFile = pFiles.filter((f) => f.file.id === fileId)[0];
        let remFiles = pFiles.filter((f) => f.file.id !== fileId);

        // Update the name and language of the file
        updatedFile.file.name = filename;

        // The language
        let lingo = langs.filter(
          (lang) =>
            lang.extensions.indexOf(`.${filename.split(".").pop()}`) !== -1
        );
        let corrLingo = lingo.filter((lang) =>
          lang.name.toLowerCase().startsWith(filename.split(".").pop()[0])
        );
        updatedFile.file.language = corrLingo[0]
          ? corrLingo[0].name.toLowerCase()
          : "";
        remFiles.push(updatedFile);
        remFiles.sort((a, b) =>
          a.file.name.toLowerCase() > b.file.name.toLowerCase()
            ? 1
            : b.file.name.toLowerCase() > a.file.name.toLowerCase()
            ? -1
            : 0
        );
        setRerender(false);
        setFiles(reverseEngineerFiles(remFiles));
        //Finally update the files
        setProcessedFiles && setProcessedFiles(remFiles);

        // remove the appended temp inp filed
        $(div).remove();
        $(e.currentTarget).removeClass(styles.active);
        $("." + styles.opts).remove();
        $(fileNode2.querySelector("." + styles.mainNodeChild)).removeClass(
          styles.dnone
        );
        $(fileNode.querySelector("." + styles.iconContainer)).removeClass(
          styles.dnone
        );
      };
      //When user presses enter,
      inp.addEventListener("keypress", (eve) => {
        if (eve.key == "Enter") {
          renameFile();
          document.removeEventListener("click", somFunc);
        }
      });

      const somFunc = (e) => {
        // remove appended input field
        if (e.target !== inp) {
          if ($(inp).hasClass("parsio")) {
            $(inp).removeClass("parsio");
            renameFile();
            document.removeEventListener("click", somFunc);
          } else {
            $(inp).addClass("parsio");
          }
        }
      };
      document.addEventListener("click", somFunc);
    });

    const dldBtn = document.querySelector(".tb-dld");

    const dldFile = () => {
      if (file.language) {
        const a = document.createElement("a");
        a.href =
          "data:text/plain;charset=utf-8," + encodeURIComponent(file.content);
        a.download = file.name;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      dldBtn.removeEventListener("click", dldFile);
    };
    dldBtn.addEventListener("click", dldFile);

    const hideOpts = (ev) => {
      if (!opts.contains(ev.target) && ev.button !== 2) {
        $("." + styles.opts).remove();
        document.removeEventListener("mousedown", hideOpts);

      }


    };
    document.addEventListener("mousedown", hideOpts);

    //    / e.currentTarget.removeEventListener("click", fileOpts);
  };

  const addFolder = () => {
    let lis = document.querySelectorAll("li");
    let lisList = [];

    for (let i = 0; i < lis.length; i++) {
      lisList.push(lis[i]);
    }

    let selected = document.querySelector("." + styles.selected);
    let treeBody;
    if (selected) {
      $(selected).hasClass(styles.folder)
        ? (treeBody = selected.parentElement.querySelector("ul"))
        : (treeBody = selected.parentElement.parentElement);
    } else {
      treeBody = document.querySelector("." + styles.root);
    }

    //Open the folder
    $(treeBody).hasClass(styles.closed) &&
      $(
        treeBody.parentElement.querySelector("." + styles.mainNodeChild)
      ).click();

    let li = document.createElement("li");
    let inp = document.createElement("input");
    if (treeBody) {
      inp.placeholder = "New Folder";
      inp.dataset.type = "folder";

      li.appendChild(inp);
      //$(li).addClass('partial')
      treeBody.appendChild(li);

      $(inp).addClass(styles.ctInp);

      inp.select();
      inp.required = true;
      let folLis = li.parentElement.querySelectorAll("." + styles.foldername);
      let foldersInFolder = [];

      for (let i = 0; i < folLis.length; i++) {
        folLis[i].dataset.parent === treeBody.dataset.id &&
          foldersInFolder.push(folLis[i].innerText);
      }

      let err = false;
      inp.addEventListener("keyup", (e) => {
        if (foldersInFolder.indexOf(e.target.value) !== -1) {
          err = true;
        } else {
          err = false;
        }
      });

      const saveFile = () => {
        if (inp.value && !err) {
          storeFile(inp, treeBody.dataset.id);
          $(li).remove();
        } else if (err) {
          $(li).remove();
        } else {
          $(li).remove();
        }
      };
      inp.addEventListener("keypress", (e) => {
        if (e.key == "Enter") {
          if (e.target.value && !err) {
            document.removeEventListener("click", somFunc);
            storeFile(inp, treeBody.dataset.id);
            $(li).remove();
          } else if (err) {
            alert(e.target.value + " already exists!");
          } else {
            alert("Are u insane!, Field cannot be empty");
          }
        }
      });

      //Save file id user clicks elsewhere

      const somFunc = (e) => {
        // remove appended input field
        if (e.target !== inp) {
          if ($(inp).hasClass("parsio")) {
            if (inp.value && !err) {
              storeFile(inp, treeBody.dataset.id);
              $(li).remove();
            } else if (err) {
              $(li).remove();
              //alert(inp.value + " already exists!");
            } else {
              $(li).remove();
              //alert("Are u insane!, Field cannot be empty");
            }
            //document.querySelector('.parsio') && saveFile();
            document.removeEventListener("click", somFunc);
          } else {
            $(inp).addClass("parsio");
          }
        }
      };
      document.addEventListener("click", somFunc);
    }
  };

  const addFile = () => {
    let lis = document.querySelectorAll("li");
    let lisList = [];

    for (let i = 0; i < lis.length; i++) {
      lisList.push(lis[i]);
    }

    let selected = document.querySelector("." + styles.selected);
    let treeBody;
    $(selected).hasClass(styles.folder)
      ? (treeBody = selected.parentElement.querySelector("ul"))
      : (treeBody = selected.parentElement.parentElement);

    //Open the folder
    $(treeBody).hasClass(styles.closed) &&
      $(
        treeBody.parentElement.querySelector("." + styles.mainNodeChild)
      ).click();

    let li = document.createElement("li");
    let inp = document.createElement("input");
    if (treeBody) {
      inp.placeholder = "New File";
      inp.dataset.type = "file";

      li.appendChild(inp);
      //$(li).addClass('partial')
      treeBody.appendChild(li);

      $(inp).addClass(styles.ctInp);

      inp.select();
      inp.required = true;
      let lis = li.parentElement.querySelectorAll("." + styles.filename);
      let filesInFolder = [];

      for (let i = 0; i < lis.length; i++) {
        lis[i].dataset.parent === treeBody.dataset.id &&
          filesInFolder.push(lis[i].innerText);
      }

      let err = false;
      inp.addEventListener("keyup", (e) => {
        if (filesInFolder.indexOf(e.target.value) !== -1) {
          err = true;
        } else {
          err = false;
        }
      });

      const saveFile = () => {
        if (inp.value && !err) {
          storeFile(inp, treeBody.dataset.id);
          $(li).remove();
        } else if (err) {
          $(li).remove();
        } else {
          $(li).remove();
        }
      };

      inp.addEventListener("keypress", (e) => {
        if (e.key == "Enter") {
          if (e.target.value && !err) {
            document.removeEventListener("click", somFunc);
            storeFile(inp, treeBody.dataset.id);
            $(li).remove();
          } else if (err) {
            alert(e.target.value + " already exists!");
          } else {
            alert("Are u insane!, Field cannot be empty");
          }
        }
      });

      //Save file id user clicks elsewhere

      const somFunc = (e) => {
        // remove appended input field
        if (e.target !== inp) {
          if ($(inp).hasClass("parsio")) {
            if (inp.value && !err) {
              storeFile(inp, treeBody.dataset.id);
              $(li).remove();
            } else if (err) {
              $(li).remove();
              //alert(inp.value + " already exists!");
            } else {
              $(li).remove();
              //alert("Are u insane!, Field cannot be empty");
            }
            //document.querySelector('.parsio') && saveFile();
            document.removeEventListener("click", somFunc);
          } else {
            $(inp).addClass("parsio");
          }
        }
      };
      document.addEventListener("click", somFunc);
    }
  };

  const storeFile = async (inp, id) => {
    let dtType = inp.dataset.type,
      fname = inp.value;
    let file;
    let updatedFiles;
    const FILES = reverseEngineerFiles(processedFilesTemp);
    if (dtType === "folder") {
      file = {
        name: fname,
        id: genId(),
        children: [],
      };
      if (id) {
        // Find the file in the files

        modifyFiles(FILES, id, file).then(() => {});
      } else {
        updatedFiles = FILES;
      }
    } else if (dtType == "file") {
      let lingo = langs.filter(
        (lang) => lang.extensions.indexOf(`.${fname.split(".").pop()}`) !== -1
      );
      let corrLingo = lingo.filter((lang) =>
        lang.name.toLowerCase().startsWith(fname.split(".").pop()[0])
      );

      let file = {
        id: genId(),

        name: fname,
        content: "",
        language: corrLingo[0] ? corrLingo[0].name.toLowerCase() : "",
      };

      //fTree = { ...fileTree };
      if (id) {
        modifyFiles(FILES, id, file);
      } else {
        updatedFiles = FILES;
      }
    }
  };

  const modifyFiles = async (files, id, fil) => {
    let filesClone = [];
    files.forEach((file) => {
      filesClone.push(file);
    });
    let prcsdFiles;

    const check = async (filesClone) => {
      filesClone.forEach((file) => {
        if (id === "root") {
          if (filesClone.indexOf(fil) === -1) {
            filesClone.push(fil);
          }
        } else {
          if (file.id === id) {
            file.children.push(fil);
          }
          if (file.children) {
            check(file.children);
          }
        }
      });

      prcsdFiles = filesClone;
    };

    check(files);
    const update = () => {
      setRerender(false);
      setFiles(prcsdFiles);
      setFilesUpdated(Date.now());
      let nd = treeItem(id, fil);
      setNewItem(nd);
    };

    update();

    return filesClone;
  };
  return (
    <div className={styles.clickbait4587}>
      <div className={`${styles.dflex} ${styles.jcsb}`}>
        <div>
          <h3>Files</h3>
        </div>
        <div className={styles.dflex}>
          <span onClick={addFile} className={styles.btn}>
            <AiFillFileAdd />
          </span>
          &nbsp; &nbsp;
          <span onClick={addFolder} className={styles.btn}>
            <AiFillFolderAdd />
          </span>
        </div>
      </div>
      <ul className={`root`}>
        <li>
          <div className={`${styles.folder}`}>
            <div className={styles.mainNodeChild}>
              <span
                className={`${styles.icon} ${styles.folderIcon}`}
                data-type="folder"
              ></span>
              &nbsp;
              <span className={styles.foldername}>
                <b>root</b>
              </span>
            </div>
            {/**
                                <span class="Filetree_iconContainer__1jbPd Filetree_fileOpts__2tgNb">
                                <span class="Filetree_icon__3V6fS Filetree_optIcon__W_2fc Filetree_active__1zX2a"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 192 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"></path></svg></span>
                                
                            </span>
                                */}
          </div>
          <ul
            data-id="root"
            className={`${styles.node} ${styles.root} ${styles.closed}`}
          ></ul>
        </li>
      </ul>
    </div>
  );
};

export default FileTree;
