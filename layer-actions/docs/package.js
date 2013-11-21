(function(pkg) {
  // Expose a require for our package so scripts can access our modules
  window.require = Require.generateFor(pkg);
})({
  "version": "0.1.0",
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "mode": "100644",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "pixel-editor\n============\n\nIt edits pixels\n",
      "type": "blob"
    },
    "TODO.md": {
      "path": "TODO.md",
      "mode": "100644",
      "content": "TODO\n====\nDocumentation\n\nPalette\n  Load Palette\n  Modify Palette\n\nLayers\n  Reorder Layers\n  Delete Layers\n\nBugs\n----\nPreview and layers get cut off for larger images\n\nV2\n----\nSync to server?\n\nAnimation Frames\n  New Frame\n  Delete Frame\n  Onion Skin\n\nSelections\n\nCopy/Paste\n\nReplays\n\nGrid\n  Modify Grid Size\n\nCommand Console\n\nScripts\n\nPlugins\n\nDone\n====\nComposite Preview\n\nZoom In/Out\n\nResize Image\n\nExport Image\n\nLoad Image\nSave Image\n\nSave Files to desktop\n  .json\n\nExport to desktop\n  .png\n\nOpen files from a file picker\n  .json\n  .png or .jpeg\n\nBugs\n----\nRefreshing canvas gets a little messed up in resizing\n\nExpand canvas when dropping an larger image\n\nPreview Erase/Transparent\n\nPreview Layer in canvas always shows at top\n",
      "type": "blob"
    },
    "actions.coffee.md": {
      "path": "actions.coffee.md",
      "mode": "100644",
      "content": "Actions\n=======\n\n    loader = require(\"./loader\")()\n    FileReading = require(\"./file_reading\")\n    Modal = require(\"./modal\")\n    Palette = require(\"./palette\")\n    saveAs = require \"./lib/file_saver\"\n    {compressToUTF16:compress, decompressFromUTF16:decompress} = global.Compressor = require \"compression\"\n\n    module.exports = Actions = (I={}, self=Core(I)) ->\n      self.extend\n        addAction: (action) ->\n          self.actions.push action\n\n        actions: Observable []\n\n      Object.keys(Actions.defaults).forEach (hotkey) ->\n        {method, icon} = Actions.defaults[hotkey]\n\n        self.addAction\n          perform: ->\n            if typeof method is \"function\"\n              method\n                editor: self\n            else\n              self[method]()\n          iconUrl: icon\n\n        self.addHotkey hotkey, method\n\n      return self\n\n    state = null\n\n    namespace = \"/pixel-editor/saves/\"\n    store = (name, data) ->\n      localStorage[\"#{namespace}#{name}\"] = compress JSON.stringify(data)\n\n    retrieve = (name) ->\n      try\n        JSON.parse decompress localStorage[\"#{namespace}#{name}\"]\n      catch\n        return\n\n    Actions.defaults =\n      \"ctrl+z\":\n        method: \"undo\"\n        icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACRklEQVQ4T6VTXUhTYRh+p47sbhcR2zmMDGXUTVBBiyBdJUjU6EJ2K4R0ESm6CyEo6qKZWcGkoC6KFt2GxKhwi4JKbcg2khmonVW6RbmGnnI1z873c3rPjp6aQQw88PJ834H3+b73eZ7PAhv8LBvsB5PAP3pK45wDZxyYXpQZSBjHWiSUJTmlUaVQGg6feZZdO9gk6HnZqXnEw6BpAFxjWBowRGwHhSgg/5RhQc6B9FkKq0ppMOJ/FdNJTIKuFye1Q84jwLGBAzbrqOENyiQciuQX1NVYIbOQgcR0IqwUV7pfn49nTYLT0Q7NuDYDShBxTfU9rgWbCA32BrDWWZGQQ2o2Be8/Sv7RCxNDVYnovdUaJCptb9njcTILhe/yDxiPxyKxS4mjVRHos7ZeOxh0bXP1ig4RiKrCk+eRfGJgcmsFgc8HteD1nn3Y8bh/vb3Nl93BHdt39oqCAKpK4Gl0JD95/d06ggfeECV076POkV1/EzQH3EHUpL3lgMdJawgsLxVgfOxNZOrGzJ8RfPeP3XTYxC5duLmvn8pCIpkhoh1FdKKIm6zoEoqYmgJpVvJP304bIvpCx6/abY6+JrHJtFB3Y81CHQulZaiv3QzzmSwk44mwulLs/hD6Yth44k5bQLAJ5xqdjeg9GBnAouUsYJAUBRblJcjlvkF6RgqjI4Ppe/OVQWoLeoaELY4eivGdy6yOsJoDHCWPoyUZoVFKlGH95H+irP/wBPbfpYztG7sYrxDxfw+uMgdoo9u1u2+i/+2Val/pb35FXyDc5lZBAAAAAElFTkSuQmCC\"\n      \"ctrl+y\":\n        method: \"redo\"\n        icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACUUlEQVQ4T6WTUUhTURjHv+scNheypmOy7RY0H7IHC6Rgo/ItB0GXWIgSBUOJMIRFkEUlBEWBDzOsXnoQpIdqTUlrQ6k9NPBhUeCaFO0udxuB7bVc5D3n3L5zYNZSiNG9nHu+C+f/4/v+33ck+M9HqkXf9/DYRRKbHo1GgVZ0NQF6Jo9miE7SU/3xgU0Bg3Mh2TBIkBpGNyWkkxHmIIQC1Snw3WVzA8Nd/ZK/HR9KhjlkPYOzL075KDWGPVZZ2dZoB6vZCvV19UANBDAGjCEEY50SeJfLgFpQbyQvLVwRgMG5XpkZ5vH2lt2K09oKP0gZTJIZmMFQzAEUYwRwCK7FD4ugaupo6mr6ggCcjp8Iy03bI157mxCtrpVBXcnB8sqySF2UoBNwtbiBUgr5Qv5OaiQ9tF7CwLO+REfr3kCj2YIHGCSzySIejD0JPT/3Z5e6bvoyTCdvUiOvQ1UmhqZ7Sv6dBx11aIlW0iD7OTs21Z+oEnOB/9r+ywvZ9C34u40nHwdL/rYDDklCwFcNlgpLYzNn5jcANpsZ4UHvAyXRIe8JWCxbsFYs4e3LIl2jsfnzr/4JEYDjE0fCbrsn4nV5sW1oYnkVchqaWEQT0cDKHFA0VPyjke/v5YRWfJS7h2Xs9PiuHe2Ko9kJ339+gwZTg2gZbx/DORAxvnwmZqKz8PH+p98ADglEunw6YcMep0exNdlgq9UKkskEBp8FXByEEwoGgp4+moX8hFYN4JBD1/fJlBhBTLWbENZJCGlmOqvjqfP2VnaGcWGyuBFQy82snP0Ffg5KIO/aNV0AAAAASUVORK5CYII=\"\n      \"ctrl+o\":\n        method: ({editor}) ->\n          Modal.show FileReading.readerInput\n            image: (dataURL) ->\n              loader.load(dataURL)\n              .then (imageData) ->\n                editor.handlePaste loader.fromImageDataWithPalette(imageData, editor.palette())\n            json: (data) ->\n              editor.restoreState data\n            text: ->\n              # TODO: Currently we don't handle this format\n            chose: ->\n              Modal.hide()\n\n        icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACsklEQVQ4T6WTW0iTYRjH/3Nu002JrOmQliRTWoZFhHRR0RzbhZA3gSzJBibYRQTeRlC3RgXVTSBCBJINE0zxQJsHMC2RglirdVBnM9e3tYM7+p3W+37h6Ouim56bD97v/f/4P//nfRT4z1L8qR8fH9cUFxe35vP584IgHCT/6sTf5SVnX8i3n+M4T1tbm7CjKwCI+JBSqXxSVVXVaDAYoNPpoNVqQYRIJBJIJpMIBAJgGGaenDkIZINCCoDJyckZs9l8xmg0QqGQGSuY5HkeXq8Xfr//scPhcMoAExMTjMVi0avV6n8CYrEY3G53uL29vVIGIC1IgHg8jpKSEmg0GqhUKqmFTCaDaDSKYDAIk8kEj8cT7ujokAPGxsaY5uZmfTqdlvrN5XKSmNqmGWxvb4MEjPr6esmB0+mUA0ZHRyUAvUjFVEgFJHVEIhE88l1FlkvjmvUZZj1z4c7OTjlgZGSEsVqtemo3m81KAJoHBYTDYfT7rqB6jwm+jTewqnoi3V2X9bIMhoeHGZvNpk+lUlLP9xadyIscWJEHS2DVFXVoNJ7E0uo03gVf4/vWj/L3N5EqzGtoaIix2+1SiBRwf+kibIedEPIiBFGAiDxC8SB2l1Vi8asby4E5MbbFVhQALpdLAtC0KeDu0gW0HLmEQOQzOOKCJ244gUNRkRqV5fswvzKFVysvhQJgcHCQaWpq0pNCKBTCjZmzaD3aTYQCeEGQnGwm1lFRZsDbbwt48WEqnGZhLwAGBgZayFt3NTQ06GpqatD19DhyLEsyYJHjOdTuNeNErR3L6wuY9nt+JnPi6egd+GRvtq+v7wAZ3XUCOkf2YhfdBToN2tbDaE/+2P5TitlP05sZHpbILfhlU/h7q3t7e8tLS0tNZIzi2trax+e7HkRFUandYoXaxG2s7tz/BeoVfR66j3EiAAAAAElFTkSuQmCC\"\n      \"ctrl+s\":\n        method: ({editor}) ->\n          if name = prompt(\"Name\", \"file\")\n            data = editor.saveState()\n\n            # TODO: We may want to save history later\n            delete data.history\n\n            blob = blob = new Blob [JSON.stringify(data)],\n              type: \"application/json\"\n\n            saveAs blob, \"#{name}.json\"\n\n        icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC4klEQVQ4T32T70tTURjHv8fpppuaQkuhlgU2f4wCs6b4QpxLod9BJSaYEOS7+gOiF/VCYvjKepf0IsFfU6wxUSNFiALJ9NWi7AelbmbX2qZzv9zdvT3nSOAMei6Xe++55/mc7/N9zmGgGBsb06Wnp19QVfVaMpkspaEjynZ4aOwLPZ8kEomppqamJJ+/Mxgll2s0mv6CgoJjhYWFMBgM0Ov1oESsr68jFAphcXERkiS9prFmgvhSABMTE9NlZWV1JpMJjLHdC4hvWZbh8XiwsLDQ09zc3JYCGB8fl2w2m1Gr1f4XEAgEMDk5udbS0rJvdwkCEAwGkZmZCZ1Oh4yMDFFCJBKB3++H1+tFcXExpqam1lpbW1MBo6OjUn19vTEcDot6Y7GYSOayuQfxeBxkMMxms1DQ1taWCnC73QLAJ/JknsgTHjz3I0cHRLZk5GdrsSJFwdKAbL0GisoQ2Iji5exSFXO5XJLdbjdyudFoVAC4H/cHf+KsrQSXjmfDPePF+eoDKQY/nV7D9NtvYCMjI1JDQ4Nxc3NT1MwB3Ic7vT9grynFjbo83H40h4e3KgUgJgNbtBsej/nw/vMy2PDwsNTY2ChM5ADaSAJwb+gXTlWVoKU2F4yuNOqwSgBFUalbgGPoO+Y/EMDpdAoAd5sDaNchKysLDlcAJyyH4PsdEslyUoFCN4dwk/mLb2UFbGBgQLJarUYKrK6uCh84oOOZHxXlJjKLNNNsWU4KOFegqAp9J6i9BOjt7T1DP5wWi8VQVFQk5PMdeb1zHvaTJbhSmwVZ2SIItYAvzBRkpmvR2beEWc8nKo6iu7v7MLXuLoEu07nYw89Cn6cQp6uO4mJtAt2z7dhrOMidwFp4Ge3WLnT1xzE9924bsDMcDkcOlVD8Klg5f/NcORor/JgJDCJPu1+ICMYkVOdfRUdPEi9m5v4F/IVVtE+8MZv0NXm6fJKcS2UkwMgDppIXLIKPS18hbSTwB3tLeq03+hLeAAAAAElFTkSuQmCC\"\n      \"ctrl+shift+s\":\n        method: ({editor}) ->\n          if name = prompt(\"File name\", \"image\")\n            editor.outputCanvas().toBlob (blob) ->\n              saveAs blob, \"#{name}.png\"\n\n        icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACs0lEQVQ4T42SS0hUURjH/2fGO2MPTC3p6VQudBEt1Bm1UWgXCEW0LNpIlk5WYoq2UYseFAmaYaRNAy2KApMkq5lRepChjJqaiUJp4cKyRTgzPsZp7jl954xEK+teDt/HPff/+57MWuwpE2DbDQx5AFLIXwuIGMbAIOgLPUa6NNARgkPnmDVp+BwKLV3rbz7QymwO7x1nVV4h6P+0rWalEVwgHKHziyvxKrMBBMTcIsdcSBcT03P6PfeEf+zrTBWzOjrH71bmprX5gqg6lCTlOH2jD9eLMxHhQKzGYNIMWCKYf0EnKzA5swAjOC64BpYkYNZZmbvucW8AFQc3qJTPNvXjyokMaEaKbjJQ6kBgUcd8iINTdq6uH8jPjENZY4+QgPDtCrvW7gugJH+9AlQ7B3GpMB2rY43QqITFMBU+r1NGEgACzCB9hxl1D96DAF7eVG5nT6mE4/sSFYA0WGM2UnSGiE7RKfWFsK7Egl6X9zt2W0xoeDQIZjvpFY2ldjzrD+Db9BQ1izpOAC2GGkewCKUcoWYsD0QFiI9PxC6LGU2twwRweEV9aQ6e9/lVrVKl5qcUAqSnyASgSy4P+QYKkrqJoeXJSBRQdyoH7gG/ov8ZPoFkw6RQzl+lT1ZIh8ApSQyujo9RwFVHFrqGAtGtoUu5Q9LqEiCjy0zI51xXO0IeLIkC991jEuARl4uy8Go4iNoj25YhK5uKllEkJwg87BwHy6Ymni+04c1IALWHk9Hw7tiK6lK7E+XNH7AlXqDt5ScClHhFTYEV3aNB1BDAN/V6RYAteS/Kbg1hc5xA+1sCUAm8usDKesYkwPJfGZy5OYCNBOjonpCb6Jk8dzRjp5zh/uzoKv/ruejyqQa/6P3yk1mL3PXU11QwsYcJJNDw1Oio3Wpsf1sZJDpWIRh4UDDjyG82p2waquUVyAAAAABJRU5ErkJggg==\"\n      \"ctrl+e\":\n        method: ({editor}) ->\n          paletteData = Palette.export editor.palette()\n          blob = new Blob [paletteData],\n            type: \"text/plain\"\n          saveAs blob, \"palette.pal\"\n        icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC/UlEQVQ4T4WTW0gUYRTH/98s4+66umYGdjHSXLesyMi18qEg7EHKsB6kIunBHoJuFBj4YNBDBEFBUUmUQS1FpaRlCEEldiEybdcSzLVMLc3bquvsdcaZ+Tq70eXBapgzhxm+8/v+3/+cYfjPdbhobVZ6WsqBOckJBeCaNioFnnweGrtWVe/6EC1l/6o/sWdjWVZa6nH7Ult66nwOcCu8I2H09XqGOvqGTje0N1f9DSBcPFLsXLYoaeeKhUbD7EwNhhQPdMWEqa+l0ONEfOpq1eqaWnfOCDh3cHP1Bkf+3uVzfWCyGxoXIGYbEJzWUT3AYTaYsU0vRFPri0czAmorS4JbwsnxPCCBFcrgphTIYj4GfR14au1A3DRDiboJ7n7PF+Z5uLrdaF2+jDHhlx3vngligV+EHg4hWFyArs4WyWoxipibbT78LQkWTcHtWR64vcOTrLvBEbEVtRgZIzHkU/TRcGovVq1bjwRRx4RPQpurUY8XBBafU8IqxtJgUQO4P9sN99iIn3Xfy/XZil8mKcNV0BQDIFjR3PgWSkCBqEewMicXfp8XokGASYng9aAX6fPSkJpowKN3rjvMczdPsm1/khgZcILrHLo8gfBoL4Kj41BHh//a5TYp403N444dBMhVFm9tFCddlyCP9FCrQjAYkzCv6AwNCcPAx3aYtBDMogmqNg1ZsEB6Wo6K+mB6XdOHfua5mafYd7eQYwrtppMFnJT4oUqvoEd6IctBjA/5ACrmLIRk+zF4a0thP9QW6yDzXHfIWaXP4/TQe5pUH4WfCvsIpNMdIWaYcoC+R4OUZJxHz9WtvwHdlx2RzLImo+ZvBlenaBGFSjtylYJmQAv+gKpSLFvsTvRcKfoDcMERtu17bJqefBArjEUM8hPmp/doMYFIkWXJLfTe2B+hI5hjR+g6u/rb4rKaeGWiJZG0C5xHZVNQ5ppMWSFbKEc94hqMC3bxfudRaUm5a1YM0Hky+wgThDWMs01gPPGff3d00BgUarczu7LzUHTtd5jOkNp6KQ05AAAAAElFTkSuQmCC\"\n      \"ctrl+l\":\n        method: ({editor}) ->\n          editor.execute editor.Command.NewLayer()\n        icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB60lEQVQ4T2NkgAAZIBYHYmYoHxf1CijxCIj/wRQwQhnGP3782MvMzMzLyMjIhE33nz9/GGbNmjUpLy+vH9kQmAFmv3//Pv7z508moAFw/SBN//79Y/j16xeDsLAww+vXrxnWrl07KScnB24ISDUImwIVnwQawsDExATWBAIgA/7+/Qs2QEhICEyD5BYvXjwpMzMTZMgDFANAimEApPD///9gQ4AuYxAUFETxGQsLizlQ4DSKASANMC+A2CADQRhkCMh1IENBbDExMQasBqAHHrIhMMNAhvDz8xNnAMhAmCEgjSBDQHwuLi7iDQAZAgsPWBixsbGRZgDI1l1n1zPsv7CV4ePX9wy///xmuH39zsyjC25nogQichiANMHA1hMrGS4838NgrGXCICukyrDvygaGE1cOM9y/86aXoAEgg9In+DP4e7oBEzoTg79mHkPPnlRgmmdiWLFu0w+cBsACEEQH1JsyZEVlM3hpp8BdtenyVIbWGS3gVAhLiSegbIys4FSiyuDj6cAATNgMlW4LGNp3JjBwMLPDXQDSYAJMbQeBmYkDyMbITDO3dDLsvb2IwUrPhkFV0pDh9vPzDMcuHWF4fP8jOAxAQBaIQdkZa04EKdCJFM7m4GcNAWYVLmCS+Pbn+5+FFxa+yQIAB8Ulv4JKPAEAAAAASUVORK5CYII=\"\n      \"ctrl+r\":\n        method: ({editor}) ->\n          {width, height} = editor.pixelExtent()\n\n          if newSize = prompt(\"New Size (WxH)\", \"#{width}x#{height}\")\n            [width, height] = newSize.split(\"x\").map (v) -> parseInt v, 10\n\n            editor.execute editor.Command.Resize({width, height})\n\n        icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACLElEQVQ4T91Tz2sTQRR+05hmTTeB0iS7h8ZjLyEKgoVehCLWFG0g0ahrMEpp6rH++EMUFH8UUbRIq7ZZ21qoh14UjfQiQkXpQWKSJmlcyzZmY3fj7DhjGklK+g/4YBjmzX7fvve9+dC15CUCNIhJgBC66H7j8H3EcjsjvhAlJr03TRNMXNsRIzjU2UcPGJaV5K5gRibNSoKjzVrwu/cDQgiSqXeArr4dJQc7e6FS1UDRFchpWflW/8Pwzr8zsI2QVS/vdXIWDuxWHpYz7wFdeRMnFmQFgRNBtImQKqcg/zMr3x543ERyQT6reB3dXZ4OAVIb3yC3uVZrYez1CNEMTeQQt9rN73Pqhg758tqru4MTgcYqzk9H5oUO8YSJTciVcvLUOTl86tEQ+SfWCC3Rutf6iYqUvBeYGGolojQVXqQiVxi4ft9S7Vbg3XL/G0FsJpLA2LQ/OT3TNIF6/8HxwXmCcV9Fx76ly0vrLI+G5yTyIDiJGNjFeUJstvlS/uXT6IumSQTHA4tu3nPMgiyQVjKlKiY9FiAFdFE+8/d9uzg3CHYRiloR0hvpH89js65G5Y/fGUi4HZ6Q6KTfbBZhXS2AXjUAxaYjxNflB/WXCjrWIatmSltbWs9cvFZiYwRuHknQKkLt7XuAtzlhJbUCKPrsJPG7DoDx24Av3z9DuaKKrcB1oqPX+4nP64M2aqYPXz8CkibDtAVmT7q2rSoPL7R8HwzM7G5u257Z/w969A/vqEbP0wAAAABJRU5ErkJggg==\"\n      \"ctrl+b\":\n        method: ({editor}) ->\n          # Hacky write to localStorage\n          try\n            images = JSON.parse localStorage.images\n          catch\n            images = {}\n\n          if name = prompt(\"Store image in local storage\", \"image_name\")\n            images[name] = editor.outputCanvas().toDataURL(\"image/png\")\n            localStorage.images = JSON.stringify images\n\n        icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC0ElEQVQ4T6WSaUhUURTH/29cMlzGbUbScZkKTNDUPqjlAhEkmZCZJYgVSvnBDxGlpEJGJBIpBhUarS6VSQVK0IKDC+rkEqiYjpNbYqONjtu4zDi+92533lTalyg6cPnfc+49v3vuuZfBfxpjzq9sms8nhJzlQGQ8z4PjAdasdMLxBCzVjcGBY2mM57qun/IPEwDljXMzSRGO7v9STH718FpJeoCdAHjYoCPJe8WoHS2nZJaexmKd6jq3blGWKo39XMvdV4i8KjVuZQQyAuCeYoakRDrD3s76r4pYMbLIfjyAssxgC6DsvZacjHFFXdfcHwGuphbIv72AlUMQVnTNYFa/nhYAt99MkbT97gIgJVqKmlYtkqM8fsFetmsR59sOvUqJrZJoiOV7sDCmxOC7+1oBUPJaQ84ckOBt9zxE5oCIAQMChjpm38mgQIhkCA5OoZgbVkPsvgO2jlKoGiqMAqCodoJkHPSAom8BiWES1HbOIIGq2Yy01FWtAs7bY7E29RyGWQbTg6vQr1L0yqS/ACh8NU4yY7ehWbUAS1cs5mBoQ4hzB8Q7j8CoKYPIlr7Isi90HQMonkpFad5xy/arNWPkXJwnPgwt4lCoBPW9OgTZttETlJAGHqXJpRDZsDAtyTHb1gtT+BUUKnhUZkVYAJerR8iFeBk6R/T07gA/WQ9vUTd2xcTDpK0AY2WCcVGG6ZYejO4uhp+PDNeq+/H0UqQFkFulJtkJfuge00Omrwe72AeWkcLNrQ0uUlua7I2Fj2p4J92BjdgL6olFFNb0ozL7ByCrXEVyE+XCv2+8exgnMh9BXX0Rmi9KbPEJBr/MQxJ7A4yz36/+FDz7xD/JibISKjj/oL+VY7kQE0fsPXtSkZOeQd+PQ099LYbHJ9AoK8CsyGuju3Q2rzfUNRXFJmzquWU9KcrFECqXWocH+IG3MSmXJjVpx25+Hv0te5PzHS7ETRuBCPcLAAAAAElFTkSuQmCC\"\n\n      \"+\":\n        method: ({editor}) ->\n          currentSize = editor.pixelSize()\n          if currentSize < 32\n            editor.pixelSize(currentSize*2)\n        icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACbklEQVQ4T6WTbWhSURjH/15fptPltJm2pJkGLRdUNAZBY/TycZ8EI6LojWAUYxBBtL74KSKCYDSEiCihDBcEvdArgy2C1WRbc6GN3jaXIpMcvl7vvefa8YarMT8IXe45l8u9z+/8zvM8R4b/vGSVeI/Hw3Qe6R8UiNhNiNhMn+AFISYIwtPwsxtn6Xex2loSQAo+3D/cqC51GeplUDAlgN6sUMJ8ksVcIj8SHb25rxpEArye5bwGtdhj1jHIFAlYvgRCAUoGaKiTY2C6Dzk2Da7Asz73kOZfEwnwPJyPbmmSW1lBRJ4rQSzRQYWpAOoUMng/nsQBy1Y8CgcxdOzJ8rbLsdLL41CWbG9WMotZAiKWATSYToFv55HJpWBW6mBf04TJhR/4Go+jyHKp0UtjxmXAw4klsmujhklkBAoA1f9jcHv6BDrNDroljo4izUkRBa6IN+MhfLg8JS0uTffHktGdLVprjurnOFEyKJvcm+zFr3QcRpUGVqMen+YWMP9zEcUCx4YGIlIuJMCdkbh3nV7V47BokcoTZMsQalCnlMGgkaP37l7scGzA2+AsJq6FVuegXEZTx/Fhy1p1l83SAJWCQbnoBVZA6EsSvndHkcmmoOaJeE6jcx68GvxcqcSKRtJsOzTI8aSbF2gj8QScQOImdobbrw9tsjo7EIuMIxJ8lSxw6T2nvN8lyAqdap0WcLeplPZGv6ml1WVz7kY08h4zwRfJ07eippoAUqdSyGaz6Dfb2lz21na8DFzHGV/ibxVqOU8eN1QW7Xq/QqV25TJLV/r8qYs1G1QWcLshb5fXmy88yMdWJbEWi2r//AZSUiAguj/HUQAAAABJRU5ErkJggg==\"\n\n      \"-\":\n        method: ({editor}) ->\n          currentSize = editor.pixelSize()\n          if currentSize > 1\n            editor.pixelSize(currentSize/2)\n        icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVElEQVQ4T6WTS2gTURSG/0zejaVNbUws0aZVamgFFUtUiBQUF2JXgYiIC0GEqovufBTELNWFblpSxIUPMFK6EsVaMVBXPoIuUkwqbUXHJA0GE5vMdDKZO+OdkaQqkQYc5twLdzjf+bjnjA7/+eiq+aFQiNl/YmRMIvIgIXIH3VGRpLQkSY8TT0bP0e9yvVoaQEs+PhJttSgD9iYdDIwC0FeQFHzJCfic5WfYl7cO1INogOcfxbDdIg851zEolgmEigJCAUYGaDbrkUgVsZAujg8f6Trzt4UGeJrg2W3tercgyeBFBbJCgwpTAZgNOhh1CqZjqa/nAz2b6gIexUtkR4eR+VYiILIKoMl08d2/Bn0+D7nEgfwo0VgGKahRyrfNx9tUmGYw+a5Adm+2MtmiRAGg+r8M/KMXwe/1QhbpOQ1ZEEHKFRhu3EV7ZlHL1ZYHr3Lsrk6bm6P6nChrBqrJnvErMLDsamVqodkIZcGZT1lrgDszmfCGFtPQFpcNeZ6gpEKogdmog92qx5sPS+DmXgg9hcmdhy9Pzf1+D7U2Onwno671lgGPqxkmAwO16SuChPh8Dtz3JRwyRbH4fjq3InL+o9djNcgfg2TdfmxMrJDBikQHqUIgSiTjEGbFgy3xLnevD+nkWyRjKmTZfyr8SYPUAP+a6Ilgn8nY3RpxdHoDnt59YJOvMRubyp2+zToaAmiTSiFbnXLE6ekLdHv78WziJs7ey652oZH/KRSEyWXbGDGYLAGuWLg6HMlfatigWiAYhL5f3+S88JBPV8/WvIO17H4CfCMpIEZZGWYAAAAASUVORK5CYII=\"\n\n      \";\":\n        method: ({editor}) ->\n          blob = new Blob [localStorage.images],\n            type: \"text/plain\"\n          saveAs blob, \"images.json\"\n\n      \"?\":\n        method: ({editor}) ->\n          window.open(\"./docs\")\n        icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC7klEQVQ4T6WTW0hUQRjH/+7q6mpkbLK663ZX28pExDJLKRRKKypZiNouVoTggy+RDxEoCSEp0UNJPkSloYTdoxtYdNE2a7vRmou4mWjppuUF3T3n7Dkz03Rku9JDNPMwM8z8f3zf9/8mBP85Qn7X3+sS52kJszOGnZSxOEoJCGNeSli9pIiNBemx737W/AJodvttYPT4nOlhphDGhYSobzUaDQJ8+/aDb0AmSol9hflSEPIdcKd93MYIrbOadFFjEwI6en3o/eIDoQzGaB2SLVNhmBaBxx2jPkUhhUV5s1WICrjhHJ1LNLQl2RJh9o740ewagik6DGvTzGB8Oj0jeNE9jJXWGFhiotD86lO/oIjZB2wp3SqgqW2obGG8/pAkybjq7IckyijfuijI5ytD9ZUOBBSKvLR48Prg4Zv+8jJ7aoUKqL//sSsjaWpC69vPcH8c5WFT7NtgxeueEURFaLEsMQZtXYO42NqNJMt05CyOQ8Pdbs+RvemJKuDk7R5/bopBf+7Be4wLMmQi81oSrFsyE5nzjQjIFHde9uGJ2wt9uBZFecmoudYu1JRkRaqAo5c7/euXmvRnOWBsYpyLeeY8zKrdGRiZkFDd9BJiQOGJAHqdBsUbU1F1/pVQV5ozCahocHUVZFkSHroG4e4b5vbJoDwN7orqFpEVXgZ+5jNhRgzWLJ2FIw0vPBfK8ydTKD31rCw31XxoSqQOFx+9g08QVGHlnkzwZsL+2gfqORQUW1anYGhYQOM9d/nNyk2TRSw+1jIXGtaya43VPOqTcM3hgSAGkJZgVIXOzgFoqIz8zAUwGiJx+NzTfpGI2a3Htk3a+G1sr2y2UUbrijemRMk8dIfrA3q9w6DcuvjYaCxPtiA0VIuKMw6fTEih44T9RyMFIZsOXrcpjB3fvCrJZJ1tQLhOq14JogKXZwinb70ZkCkteV67489WDkJySs7PI9oQ9TMRhcZ9qwGhxMt7o16SWGN73a6/f6Yg5F/WrzeMbiDawgJJAAAAAElFTkSuQmCC\"\n",
      "type": "blob"
    },
    "command.coffee.md": {
      "path": "command.coffee.md",
      "mode": "100644",
      "content": "Command\n=======\n\nCommands that can be done/undone in the editor.\n\n    module.exports = (I={}, self) ->\n      self.Command = {}\n\nThis is a weird DSL for each command to inherit a toJSON method and to register\nto be de-serialized by name.\n\n*IMPORTANT:* If the names change then old command data may fail to load in newer\nversions.\n\n      C = (name, constructor) ->\n        self.Command[name] = (data={}) ->\n          data = Object.extend {}, data\n          data.name = name\n\n          command = constructor(data)\n\n          command.toJSON ?= ->\n            # TODO: May want to return a copy of the data to be super-duper safe\n            data\n\n          return command\n\n      C \"ChangePalette\", (data) ->\n        data.previous ?= self.palette()\n\n        execute: ->\n          self.palette data.palette\n\n        undo: ->\n          self.palette data.previous\n\n      C \"ChangePixel\", (data) ->\n        data.previous ?= self.getPixel(data).index\n\n        execute: ->\n          self.changePixel(data)\n\n        undo: ->\n          self.changePixel Object.extend {}, data, index: data.previous\n\n      C \"Resize\", (data) ->\n        {width, height, state} = data\n\n        data.previous ?= self.pixelExtent()\n\n        state ?= self.layerState()\n\n        execute: ->\n          self.resize(data)\n\n        undo: ->\n          self.restoreLayerState state\n\n      C \"NewLayer\", (data) ->\n        execute: ->\n          console.log data\n          self.newLayer(data)\n\n        undo: ->\n          # TODO: May need to know layer index and previously active layer\n          # index\n          self.removeLayer()\n\n      C \"Composite\", (data) ->\n        if data.commands\n          # We came from JSON so rehydrate the commands.\n          data.commands = data.commands.map self.Command.parse\n        else\n          data.commands = []\n\n        commands = data.commands\n\n        execute: ->\n          commands.invoke \"execute\"\n\n        undo: ->\n          # Undo last command first because the order matters\n          commands.copy().reverse().invoke \"undo\"\n\n        push: (command, noExecute) ->\n          # We execute commands immediately when pushed in the compound\n          # so that the effects of events during mousemove appear\n          # immediately but they are all revoked together on undo/redo\n          # Passing noExecute as true will skip executing if we are\n          # adding commands that have already executed.\n          commands.push command\n          command.execute() unless noExecute\n\n        toJSON: ->\n          Object.extend {}, data,\n            commands: commands.invoke \"toJSON\"\n\n      self.Command.parse = (commandData) ->\n        self.Command[commandData.name](commandData)\n",
      "type": "blob"
    },
    "drop.coffee.md": {
      "path": "drop.coffee.md",
      "mode": "100644",
      "content": "Drop and Paste Events\n=====================\n\n    Loader = require \"./loader\"\n\n    loader = Loader()\n\n    Drop = (I={}, self=Core(I)) ->\n      callback = ({dataURL}) ->\n        loader.load(dataURL)\n        .then (imageData) ->\n          # TODO This coupling seems a little too tight\n          self.handlePaste loader.fromImageDataWithPalette(imageData, self.palette())\n\n      # TODO: Scope these events to the editor, not the entire page\n      $(\"html\").dropImageReader callback\n      $(document).pasteImageReader callback\n\n    module.exports = Drop\n\nHelpers\n-------\n\n    logError = (message) ->\n      console.error message\n",
      "type": "blob"
    },
    "editor.coffee.md": {
      "path": "editor.coffee.md",
      "mode": "100644",
      "content": "Pixel Editor\n============\n\nWelcome to this cool pixel editor. Eventually you'll be able to read this for\nhelp, but right now it's mostly code.\n\nEditing pixels in your browser.\n\n    # For debug purposes\n    global.PACKAGE = PACKAGE\n    global.require = require\n\n    require \"appcache\"\n    require \"jquery-utils\"\n\n    require \"./lib/canvas-to-blob\"\n    saveAs = require \"./lib/file_saver\"\n\n    runtime = require(\"runtime\")(PACKAGE)\n    runtime.boot()\n    runtime.applyStyleSheet(require('./style'))\n\n    TouchCanvas = require \"touch-canvas\"\n    GridGen = require \"grid-gen\"\n\n    Drop = require \"./drop\"\n\n    Command = require \"./command\"\n    Undo = require \"./undo\"\n    Hotkeys = require \"./hotkeys\"\n    Tools = require \"./tools\"\n    Actions = require \"./actions\"\n    Layer = require \"./layer\"\n\n    Palette = require(\"./palette\")\n\n    template = require \"./templates/editor\"\n    debugTemplate = require \"./templates/debug\"\n\n    {Size} = require \"./util\"\n\n    Editor = (I={}, self) ->\n      activeIndex = Observable(1)\n\n      pixelExtent = Observable Size(32, 32)\n      pixelSize = Observable 8\n      canvasSize = Observable ->\n        pixelExtent().scale(pixelSize())\n\n      canvas = null\n      lastCommand = null\n\n      self ?= Model(I)\n\n      self.include Command\n      self.include Undo\n      self.include Hotkeys\n      self.include Tools\n      self.include Actions\n      self.include Drop\n\n      activeTool = self.activeTool\n\n      updateActiveLayer = ->\n        # TODO: This may need to have consideration for undo-ability.\n        if self.layers.indexOf(self.activeLayer()) is -1\n          self.activeLayer self.layers().last()\n\n      drawPixel = (canvas, x, y, color, size) ->\n        # HACK for previewCanvas\n        if canvas is previewCanvas and color is \"transparent\"\n          # TODO: Background color for the canvas area\n          color = \"white\"\n\n        if color is \"transparent\"\n          canvas.clear\n            x: x * size\n            y: y * size\n            width: size\n            height: size\n        else\n          canvas.drawRect\n            x: x * size\n            y: y * size\n            width: size\n            height: size\n            color: color\n\n      self.extend\n        activeIndex: activeIndex\n        activeLayer: Observable()\n        activeLayerIndex: ->\n          self.layers.indexOf(self.activeLayer())\n\n        backgroundIndex: Observable 0\n\n        pixelSize: pixelSize\n        pixelExtent: pixelExtent\n\n        handlePaste: (data) ->\n          command = self.Command.Composite()\n          self.execute command\n\n          if data.width > pixelExtent().width or data.height > pixelExtent().height\n            command.push self.Command.Resize pixelExtent().max(data)\n\n          command.push self.Command.NewLayer(data)\n\n        newLayer: (data) ->\n          # TODO: Check layer width and height against canvas width and height.\n          makeLayer(data?.data)\n\n          self.repaint()\n\n        removeLayer: ->\n          self.layers.pop()\n          updateActiveLayer()\n\n          self.repaint()\n\n        outputCanvas: ->\n          outputCanvas = TouchCanvas pixelExtent()\n\n          self.layers.forEach (layer) ->\n            # TODO: Only paint once per pixel, rather than once per pixel per layer.\n            # By being smarter about transparency\n            layer.each (index, x, y) ->\n              outputCanvas.drawRect\n                x: x\n                y: y\n                width: 1\n                height: 1\n                color: self.palette()[index]\n\n          outputCanvas.element()\n\n        resize: (size) ->\n          pixelExtent Size(size)\n\n        repaint: ->\n          self.layers().first().each (_, x, y) ->\n            self.repaintPixel {x, y}\n\n          return self\n\n        restoreState: (state) ->\n          self.palette state.palette\n          self.restoreLayerState(state.layers)\n\n          self.activeLayer self.layers()[state.activeLayerIndex]\n\n          self.history state.history\n\n        saveState: ->\n          palette: self.palette()\n          layers: self.layerState()\n          activeLayerIndex: self.activeLayerIndex()\n          history: self.history().invoke \"toJSON\"\n\n        layerState: ->\n          self.layers().invoke \"toJSON\"\n\n        restoreLayerState: (layerData) ->\n          self.pixelExtent Size layerData.first()\n\n          index = self.activeLayerIndex()\n\n          self.layers []\n\n          layerData.forEach (layerData) ->\n            makeLayer layerData.data\n\n          self.activeLayer self.layer(index)\n\n          self.repaint()\n\n        draw: ({x, y}) ->\n          lastCommand.push self.Command.ChangePixel\n            x: x\n            y: y\n            index: activeIndex()\n            layer: self.activeLayerIndex()\n\n        changePixel: (params) ->\n          {x, y, index, layer} = params\n\n          self.layer(layer).set(x, y, index) unless canvas is previewCanvas\n\n          self.repaintPixel(params)\n\n        layers: Observable []\n\n        layer: (index) ->\n          if index?\n            self.layers()[index]\n          else\n            self.activeLayer()\n\n        repaintPixel: ({x, y, index:colorIndex, layer:layerIndex}) ->\n          if canvas is previewCanvas\n            # Need to get clever to handle the layers and transparancy, so it gets a little nuts\n\n            index = self.layers.map (layer, i) ->\n              if i is layerIndex # Replace the layer's pixel with our preview pixel\n                if colorIndex is 0\n                  self.layers.map (layer, i) ->\n                    layer.get(x, y)\n                  .filter (index, i) ->\n                    (index != 0) and !self.layers()[i].hidden() and (i < layerIndex)\n                  .last() or self.backgroundIndex()\n                else\n                  colorIndex\n              else\n                layer.get(x, y)\n            .filter (index, i) ->\n              # HACK: Transparent is assumed to be index zero\n              (index != 0) and !self.layers()[i].hidden()\n            .last() or self.backgroundIndex()\n          else\n            index = self.layers.map (layer) ->\n              layer.get(x, y)\n            .filter (index, i) ->\n              # HACK: Transparent is assumed to be index zero\n              (index != 0) and !self.layers()[i].hidden()\n            .last() or self.backgroundIndex()\n\n          color = self.palette()[index]\n\n          drawPixel(canvas, x, y, color, pixelSize())\n          drawPixel(thumbnailCanvas, x, y, color, 1) unless canvas is previewCanvas\n\n        getPixel: ({x, y, layer}) ->\n          x: x\n          y: y\n          index: self.layer(layer).get(x, y)\n          layer: layer ? self.activeLayerIndex()\n\n        # HACK: Adding in transparent to palette\n        palette: Observable([\"transparent\"].concat Palette.dawnBringer32)\n\nThis preview function is a little nuts, but I'm not sure how to clean it up.\n\nIt makes a copy of the current command chunk for undoing, sets the canvas\nequal to the preview canvas, then executes the passed in function.\n\nWe'll probably want to use a whole preview layer, so we don't need to worry about\naccidentally setting the pixel values during the preview.\n\n        preview: (fn) ->\n          realCommand = lastCommand\n          lastCommand = self.Command.Composite()\n          realCanvas = canvas\n          canvas = previewCanvas\n\n          canvas.clear()\n\n          fn()\n\n          canvas = realCanvas\n          lastCommand = realCommand\n\n      makeLayer = (data) ->\n        layer = Layer\n          width: pixelExtent().width\n          height: pixelExtent().height\n          data: data\n          palette: self.palette\n\n        layer.hidden.observe self.repaint\n\n        self.layers.push layer\n        self.activeLayer layer\n\n      makeLayer()\n\n      $('body').append template self\n\n      canvas = TouchCanvas canvasSize()\n      previewCanvas = TouchCanvas canvasSize()\n      thumbnailCanvas = TouchCanvas pixelExtent()\n\n      # TODO: Tempest should have an easier way to do this\n      updateActiveColor = (newIndex) ->\n        color = self.palette()[newIndex]\n\n        $(\".palette .current\").css\n          backgroundColor: color\n\n      updateActiveColor(activeIndex())\n      activeIndex.observe updateActiveColor\n\n      $(\".viewport\")\n        .append(canvas.element())\n        .append($(previewCanvas.element()).addClass(\"preview\"))\n\n      $(\".thumbnail\").append thumbnailCanvas.element()\n\n      updateViewportCentering = (->\n        size = canvasSize()\n        $(\".viewport\").toggleClass \"vertical-center\", size.height < $(\".main\").height()\n      ).debounce(15)\n      $(window).resize updateViewportCentering\n\n      updateCanvasSize = (size) ->\n        gridImage = GridGen(\n          # TODO: Grid size options and matching pixel size/extent\n        ).backgroundImage()\n\n        [canvas, previewCanvas].forEach (canvas) ->\n          element = canvas.element()\n          element.width = size.width\n          element.height = size.height\n\n          canvas.clear()\n\n        $(\".viewport, .overlay\").css\n          width: size.width\n          height: size.height\n\n        $(\".overlay\").css\n          backgroundImage: gridImage\n\n        self.repaint()\n\n      updateCanvasSize(canvasSize())\n      canvasSize.observe updateCanvasSize\n\n      updatePixelExtent = (size) ->\n        self.layers.forEach (layer) ->\n          layer.resize size\n\n        element = thumbnailCanvas.element()\n        element.width = size.width\n        element.height = size.height\n\n        thumbnailCanvas.clear()\n\n        self.repaint()\n\n      pixelExtent.observe updatePixelExtent\n\n      self.palette.observe ->\n        self.repaint()\n\n      canvasPosition = (position) ->\n        position.scale(pixelExtent()).floor()\n\n      previewCanvas.on \"touch\", (position) ->\n        lastCommand = self.Command.Composite()\n        self.execute lastCommand\n\n        activeTool().touch\n          position: canvasPosition position\n          editor: self\n\n      previewCanvas.on \"move\", (position) ->\n        activeTool().move\n          position: canvasPosition position\n          editor: self\n\n      previewCanvas.on \"release\", (position) ->\n        activeTool().release\n          position: canvasPosition position\n          editor: self\n\n        previewCanvas.clear()\n\n      return self\n\n    # For debugging\n    global.editor = Editor()\n",
      "type": "blob"
    },
    "file_reading.coffee.md": {
      "path": "file_reading.coffee.md",
      "mode": "100644",
      "content": "File Reading\n============\n\nRead files from a file input triggering an event when a person chooses a file.\n\nCurrently we only care about json, image, and text files, though we may care\nabout others later.\n\n    detectType = (file) ->\n      if file.type.match /^image\\//\n        return \"image\"\n\n      if file.name.match /\\.json$/\n        return \"json\"\n\n      return \"text\"\n\n    module.exports =\n      readerInput: ({chose, encoding, image, json, text}) ->\n        encoding ?= \"UTF-8\"\n\n        input = document.createElement('input')\n        input.type = \"file\"\n\n        input.onchange = ->\n          reader = new FileReader()\n\n          file = input.files[0]\n\n          switch detectType(file)\n            when \"image\"\n              reader.onload = (evt) ->\n                image? evt.target.result\n\n              reader.readAsDataURL(file)\n            when \"json\"\n              reader.onload = (evt) ->\n                json? JSON.parse evt.target.result\n\n              reader.readAsText(file, encoding)\n            when \"text\"\n              reader.onload = (evt) ->\n                text? evt.target.result\n\n              reader.readAsText(file, encoding)\n\n          chose(file)\n\n        return input\n",
      "type": "blob"
    },
    "hotkeys.coffee.md": {
      "path": "hotkeys.coffee.md",
      "mode": "100644",
      "content": "Hotkeys\n=======\n\nHotkeys for the pixel editor.\n\n    module.exports = (I={}, self) ->\n      self.extend\n        addHotkey: (key, method) ->\n          $(document).bind \"keydown\", key, (event) ->\n            if typeof method is \"function\"\n              method\n                editor: self\n            else\n              self[method]()\n\n            event.preventDefault()\n\n      return self\n",
      "type": "blob"
    },
    "layer.coffee.md": {
      "path": "layer.coffee.md",
      "mode": "100644",
      "content": "Layer\n=====\n\nTouchCanvas, for previews.\n\n    TouchCanvas = require \"touch-canvas\"\n\nA layer is a 2d set of pixels.\n\n    {Grid} = require \"./util\"\n\n    Layer = (I={}, self=Core(I)) ->\n      # TODO: width and height as an extent\n      {width, height, palette, data} = I\n\n      pixelSize = 1\n\n      grid = Grid width, height, (x, y) ->\n        if data\n          data[x + y * width]\n        else\n          0\n\n      previewCanvas = TouchCanvas\n        width: width\n        height: height\n\n      self.extend\n        previewCanvas: previewCanvas.element()\n\n        each: grid.each\n        get: grid.get\n        hidden: Observable(false)\n\n        set: (x, y, index) ->\n          paint(x, y, index)\n\n          return grid.set x, y, index\n\n        repaint: ->\n          grid.each (index, x, y) ->\n            paint(x, y, index)\n\n        resize: (size) ->\n          {width:newWidth, height:newHeight} = size\n\n          if newHeight > height\n            grid.expand(0, newHeight - height, 0)\n          else if newHeight < height\n            grid.contract(0, height - newHeight)\n\n          height = newHeight\n\n          if newWidth > width\n            grid.expand(newHeight - width, 0, 0)\n          else if newWidth < width\n            grid.contract(width - newWidth, 0)\n\n          width = newWidth\n\n          # TODO: Move this into an observable?\n          element = previewCanvas.element()\n          element.width = width\n          element.height = height\n\n          self.repaint()\n\n        toJSON: ->\n          width: width\n          height: height\n          data: grid.toArray()\n\n      paint = (x, y, index) ->\n        color = palette()[index]\n\n        if color is \"transparent\"\n          previewCanvas.clear\n            x: x * pixelSize\n            y: y * pixelSize\n            width: pixelSize\n            height: pixelSize\n        else\n          previewCanvas.drawRect\n            x: x * pixelSize\n            y: y * pixelSize\n            width: pixelSize\n            height: pixelSize\n            color: color\n\n      if data\n        self.repaint()\n\n      return self\n\n    module.exports = Layer\n\nHelpers\n-------\n\n    previewCanvas = (width, height) ->\n      canvas = document.createElement(\"canvas\")\n",
      "type": "blob"
    },
    "lib/canvas-to-blob.js": {
      "path": "lib/canvas-to-blob.js",
      "mode": "100644",
      "content": "/* canvas-toBlob.js\n * A canvas.toBlob() implementation.\n * 2011-07-13\n * \n * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr\n * License: X11/MIT\n *   See LICENSE.md\n */\n\n/*global self */\n/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,\n  plusplus: true */\n\n/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */\n\n(function(view) {\n\"use strict\";\nvar\n    Uint8Array = view.Uint8Array\n\t, HTMLCanvasElement = view.HTMLCanvasElement\n\t, is_base64_regex = /\\s*;\\s*base64\\s*(?:;|$)/i\n\t, base64_ranks\n\t, decode_base64 = function(base64) {\n\t\tvar\n\t\t\t  len = base64.length\n\t\t\t, buffer = new Uint8Array(len / 4 * 3 | 0)\n\t\t\t, i = 0\n\t\t\t, outptr = 0\n\t\t\t, last = [0, 0]\n\t\t\t, state = 0\n\t\t\t, save = 0\n\t\t\t, rank\n\t\t\t, code\n\t\t\t, undef\n\t\t;\n\t\twhile (len--) {\n\t\t\tcode = base64.charCodeAt(i++);\n\t\t\trank = base64_ranks[code-43];\n\t\t\tif (rank !== 255 && rank !== undef) {\n\t\t\t\tlast[1] = last[0];\n\t\t\t\tlast[0] = code;\n\t\t\t\tsave = (save << 6) | rank;\n\t\t\t\tstate++;\n\t\t\t\tif (state === 4) {\n\t\t\t\t\tbuffer[outptr++] = save >>> 16;\n\t\t\t\t\tif (last[1] !== 61 /* padding character */) {\n\t\t\t\t\t\tbuffer[outptr++] = save >>> 8;\n\t\t\t\t\t}\n\t\t\t\t\tif (last[0] !== 61 /* padding character */) {\n\t\t\t\t\t\tbuffer[outptr++] = save;\n\t\t\t\t\t}\n\t\t\t\t\tstate = 0;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t// 2/3 chance there's going to be some null bytes at the end, but that\n\t\t// doesn't really matter with most image formats.\n\t\t// If it somehow matters for you, truncate the buffer up outptr.\n\t\treturn buffer;\n\t}\n;\nif (Uint8Array) {\n\tbase64_ranks = new Uint8Array([\n\t\t  62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1\n\t\t, -1, -1,  0, -1, -1, -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9\n\t\t, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25\n\t\t, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35\n\t\t, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51\n\t]);\n}\nif (HTMLCanvasElement && !HTMLCanvasElement.prototype.toBlob) {\n\tHTMLCanvasElement.prototype.toBlob = function(callback, type /*, ...args*/) {\n\t\t  if (!type) {\n\t\t\ttype = \"image/png\";\n\t\t} if (this.mozGetAsFile) {\n\t\t\tcallback(this.mozGetAsFile(\"canvas\", type));\n\t\t\treturn;\n\t\t}\n\t\tvar\n\t\t\t  args = Array.prototype.slice.call(arguments, 1)\n\t\t\t, dataURI = this.toDataURL.apply(this, args)\n\t\t\t, header_end = dataURI.indexOf(\",\")\n\t\t\t, data = dataURI.substring(header_end + 1)\n\t\t\t, is_base64 = is_base64_regex.test(dataURI.substring(0, header_end))\n\t\t\t, blob\n\t\t;\n\t\tif (Blob.fake) {\n\t\t\t// no reason to decode a data: URI that's just going to become a data URI again\n\t\t\tblob = new Blob\n\t\t\tif (is_base64) {\n\t\t\t\tblob.encoding = \"base64\";\n\t\t\t} else {\n\t\t\t\tblob.encoding = \"URI\";\n\t\t\t}\n\t\t\tblob.data = data;\n\t\t\tblob.size = data.length;\n\t\t} else if (Uint8Array) {\n\t\t\tif (is_base64) {\n\t\t\t\tblob = new Blob([decode_base64(data)], {type: type});\n\t\t\t} else {\n\t\t\t\tblob = new Blob([decodeURIComponent(data)], {type: type});\n\t\t\t}\n\t\t}\n\t\tcallback(blob);\n\t};\n}\n}(self));\n",
      "type": "blob"
    },
    "lib/file_saver.js": {
      "path": "lib/file_saver.js",
      "mode": "100644",
      "content": "/* FileSaver.js\n * A saveAs() FileSaver implementation.\n * 2013-10-21\n *\n * By Eli Grey, http://eligrey.com\n * License: X11/MIT\n *   See LICENSE.md\n */\n\n/*global self */\n/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,\n  plusplus: true */\n\n/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */\n\nvar saveAs = saveAs\n  || (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))\n  || (function(view) {\n  \"use strict\";\n\tvar\n\t\t  doc = view.document\n\t\t  // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet\n\t\t, get_URL = function() {\n\t\t\treturn view.URL || view.webkitURL || view;\n\t\t}\n\t\t, URL = view.URL || view.webkitURL || view\n\t\t, save_link = doc.createElementNS(\"http://www.w3.org/1999/xhtml\", \"a\")\n\t\t, can_use_save_link =  !view.externalHost && \"download\" in save_link\n\t\t, click = function(node) {\n\t\t\tvar event = doc.createEvent(\"MouseEvents\");\n\t\t\tevent.initMouseEvent(\n\t\t\t\t\"click\", true, false, view, 0, 0, 0, 0, 0\n\t\t\t\t, false, false, false, false, 0, null\n\t\t\t);\n\t\t\tnode.dispatchEvent(event);\n\t\t}\n\t\t, webkit_req_fs = view.webkitRequestFileSystem\n\t\t, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem\n\t\t, throw_outside = function (ex) {\n\t\t\t(view.setImmediate || view.setTimeout)(function() {\n\t\t\t\tthrow ex;\n\t\t\t}, 0);\n\t\t}\n\t\t, force_saveable_type = \"application/octet-stream\"\n\t\t, fs_min_size = 0\n\t\t, deletion_queue = []\n\t\t, process_deletion_queue = function() {\n\t\t\tvar i = deletion_queue.length;\n\t\t\twhile (i--) {\n\t\t\t\tvar file = deletion_queue[i];\n\t\t\t\tif (typeof file === \"string\") { // file is an object URL\n\t\t\t\t\tURL.revokeObjectURL(file);\n\t\t\t\t} else { // file is a File\n\t\t\t\t\tfile.remove();\n\t\t\t\t}\n\t\t\t}\n\t\t\tdeletion_queue.length = 0; // clear queue\n\t\t}\n\t\t, dispatch = function(filesaver, event_types, event) {\n\t\t\tevent_types = [].concat(event_types);\n\t\t\tvar i = event_types.length;\n\t\t\twhile (i--) {\n\t\t\t\tvar listener = filesaver[\"on\" + event_types[i]];\n\t\t\t\tif (typeof listener === \"function\") {\n\t\t\t\t\ttry {\n\t\t\t\t\t\tlistener.call(filesaver, event || filesaver);\n\t\t\t\t\t} catch (ex) {\n\t\t\t\t\t\tthrow_outside(ex);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t, FileSaver = function(blob, name) {\n\t\t\t// First try a.download, then web filesystem, then object URLs\n\t\t\tvar\n\t\t\t\t  filesaver = this\n\t\t\t\t, type = blob.type\n\t\t\t\t, blob_changed = false\n\t\t\t\t, object_url\n\t\t\t\t, target_view\n\t\t\t\t, get_object_url = function() {\n\t\t\t\t\tvar object_url = get_URL().createObjectURL(blob);\n\t\t\t\t\tdeletion_queue.push(object_url);\n\t\t\t\t\treturn object_url;\n\t\t\t\t}\n\t\t\t\t, dispatch_all = function() {\n\t\t\t\t\tdispatch(filesaver, \"writestart progress write writeend\".split(\" \"));\n\t\t\t\t}\n\t\t\t\t// on any filesys errors revert to saving with object URLs\n\t\t\t\t, fs_error = function() {\n\t\t\t\t\t// don't create more object URLs than needed\n\t\t\t\t\tif (blob_changed || !object_url) {\n\t\t\t\t\t\tobject_url = get_object_url(blob);\n\t\t\t\t\t}\n\t\t\t\t\tif (target_view) {\n\t\t\t\t\t\ttarget_view.location.href = object_url;\n\t\t\t\t\t} else {\n                        window.open(object_url, \"_blank\");\n                    }\n\t\t\t\t\tfilesaver.readyState = filesaver.DONE;\n\t\t\t\t\tdispatch_all();\n\t\t\t\t}\n\t\t\t\t, abortable = function(func) {\n\t\t\t\t\treturn function() {\n\t\t\t\t\t\tif (filesaver.readyState !== filesaver.DONE) {\n\t\t\t\t\t\t\treturn func.apply(this, arguments);\n\t\t\t\t\t\t}\n\t\t\t\t\t};\n\t\t\t\t}\n\t\t\t\t, create_if_not_found = {create: true, exclusive: false}\n\t\t\t\t, slice\n\t\t\t;\n\t\t\tfilesaver.readyState = filesaver.INIT;\n\t\t\tif (!name) {\n\t\t\t\tname = \"download\";\n\t\t\t}\n\t\t\tif (can_use_save_link) {\n\t\t\t\tobject_url = get_object_url(blob);\n\t\t\t\t// FF for Android has a nasty garbage collection mechanism\n\t\t\t\t// that turns all objects that are not pure javascript into 'deadObject'\n\t\t\t\t// this means `doc` and `save_link` are unusable and need to be recreated\n\t\t\t\t// `view` is usable though:\n\t\t\t\tdoc = view.document;\n\t\t\t\tsave_link = doc.createElementNS(\"http://www.w3.org/1999/xhtml\", \"a\");\n\t\t\t\tsave_link.href = object_url;\n\t\t\t\tsave_link.download = name;\n\t\t\t\tvar event = doc.createEvent(\"MouseEvents\");\n\t\t\t\tevent.initMouseEvent(\n\t\t\t\t\t\"click\", true, false, view, 0, 0, 0, 0, 0\n\t\t\t\t\t, false, false, false, false, 0, null\n\t\t\t\t);\n\t\t\t\tsave_link.dispatchEvent(event);\n\t\t\t\tfilesaver.readyState = filesaver.DONE;\n\t\t\t\tdispatch_all();\n\t\t\t\treturn;\n\t\t\t}\n\t\t\t// Object and web filesystem URLs have a problem saving in Google Chrome when\n\t\t\t// viewed in a tab, so I force save with application/octet-stream\n\t\t\t// http://code.google.com/p/chromium/issues/detail?id=91158\n\t\t\tif (view.chrome && type && type !== force_saveable_type) {\n\t\t\t\tslice = blob.slice || blob.webkitSlice;\n\t\t\t\tblob = slice.call(blob, 0, blob.size, force_saveable_type);\n\t\t\t\tblob_changed = true;\n\t\t\t}\n\t\t\t// Since I can't be sure that the guessed media type will trigger a download\n\t\t\t// in WebKit, I append .download to the filename.\n\t\t\t// https://bugs.webkit.org/show_bug.cgi?id=65440\n\t\t\tif (webkit_req_fs && name !== \"download\") {\n\t\t\t\tname += \".download\";\n\t\t\t}\n\t\t\tif (type === force_saveable_type || webkit_req_fs) {\n\t\t\t\ttarget_view = view;\n\t\t\t}\n\t\t\tif (!req_fs) {\n\t\t\t\tfs_error();\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tfs_min_size += blob.size;\n\t\t\treq_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {\n\t\t\t\tfs.root.getDirectory(\"saved\", create_if_not_found, abortable(function(dir) {\n\t\t\t\t\tvar save = function() {\n\t\t\t\t\t\tdir.getFile(name, create_if_not_found, abortable(function(file) {\n\t\t\t\t\t\t\tfile.createWriter(abortable(function(writer) {\n\t\t\t\t\t\t\t\twriter.onwriteend = function(event) {\n\t\t\t\t\t\t\t\t\ttarget_view.location.href = file.toURL();\n\t\t\t\t\t\t\t\t\tdeletion_queue.push(file);\n\t\t\t\t\t\t\t\t\tfilesaver.readyState = filesaver.DONE;\n\t\t\t\t\t\t\t\t\tdispatch(filesaver, \"writeend\", event);\n\t\t\t\t\t\t\t\t};\n\t\t\t\t\t\t\t\twriter.onerror = function() {\n\t\t\t\t\t\t\t\t\tvar error = writer.error;\n\t\t\t\t\t\t\t\t\tif (error.code !== error.ABORT_ERR) {\n\t\t\t\t\t\t\t\t\t\tfs_error();\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t};\n\t\t\t\t\t\t\t\t\"writestart progress write abort\".split(\" \").forEach(function(event) {\n\t\t\t\t\t\t\t\t\twriter[\"on\" + event] = filesaver[\"on\" + event];\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\twriter.write(blob);\n\t\t\t\t\t\t\t\tfilesaver.abort = function() {\n\t\t\t\t\t\t\t\t\twriter.abort();\n\t\t\t\t\t\t\t\t\tfilesaver.readyState = filesaver.DONE;\n\t\t\t\t\t\t\t\t};\n\t\t\t\t\t\t\t\tfilesaver.readyState = filesaver.WRITING;\n\t\t\t\t\t\t\t}), fs_error);\n\t\t\t\t\t\t}), fs_error);\n\t\t\t\t\t};\n\t\t\t\t\tdir.getFile(name, {create: false}, abortable(function(file) {\n\t\t\t\t\t\t// delete file if it already exists\n\t\t\t\t\t\tfile.remove();\n\t\t\t\t\t\tsave();\n\t\t\t\t\t}), abortable(function(ex) {\n\t\t\t\t\t\tif (ex.code === ex.NOT_FOUND_ERR) {\n\t\t\t\t\t\t\tsave();\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tfs_error();\n\t\t\t\t\t\t}\n\t\t\t\t\t}));\n\t\t\t\t}), fs_error);\n\t\t\t}), fs_error);\n\t\t}\n\t\t, FS_proto = FileSaver.prototype\n\t\t, saveAs = function(blob, name) {\n\t\t\treturn new FileSaver(blob, name);\n\t\t}\n\t;\n\tFS_proto.abort = function() {\n\t\tvar filesaver = this;\n\t\tfilesaver.readyState = filesaver.DONE;\n\t\tdispatch(filesaver, \"abort\");\n\t};\n\tFS_proto.readyState = FS_proto.INIT = 0;\n\tFS_proto.WRITING = 1;\n\tFS_proto.DONE = 2;\n\n\tFS_proto.error =\n\tFS_proto.onwritestart =\n\tFS_proto.onprogress =\n\tFS_proto.onwrite =\n\tFS_proto.onabort =\n\tFS_proto.onerror =\n\tFS_proto.onwriteend =\n\t\tnull;\n\n\tview.addEventListener(\"unload\", process_deletion_queue, false);\n\treturn saveAs;\n}(window));\n\nif (typeof module !== 'undefined') module.exports = saveAs;\n",
      "type": "blob"
    },
    "loader.coffee.md": {
      "path": "loader.coffee.md",
      "mode": "100644",
      "content": "Loader\n======\n\n    Loader = (I={}, self=Core(I)) ->\n      self.extend\n        load: (dataURL) ->\n          deferred = Deferred()\n\n          context = document.createElement('canvas').getContext('2d')\n          image = document.createElement(\"image\")\n\n          image.onload = ->\n            {width, height} = image\n\n            context.drawImage(image, 0, 0)\n            imageData = context.getImageData(0, 0, width, height)\n\n            deferred.resolve imageData\n\n          image.onerror = ->\n            deferred.reject \"Error loading image data\"\n\n          image.src = dataURL\n\n          return deferred.promise()\n\nLoad the imageData and return the data with a palette representing the colors\nfound in the imageData.\n\n        fromImageData: (imageData) ->\n          {width, height} = imageData\n\n          colorFrequency = {}\n\n          colors = [0...(width * height)].map (n) ->\n            pieces = getColor(imageData, n)\n\n            color = arrayToHex(pieces)\n\n            console.log color\n\n            colorFrequency[color] ?= 0\n            colorFrequency[color] += 1\n\n            color\n\n          table = Object.keys(colorFrequency).sort (a, b) ->\n            colorFrequency[b] - colorFrequency[a]\n          .reduce (table, color, index) ->\n            table[color] = index\n\n            table\n          , {}\n\n          palette = Object.keys(table)\n\n          data = [0...(width * height)].map (n) ->\n            table[colors[n]]\n\n          palette: palette\n          width: width\n          height: height\n          data: data\n\nLoad the image data and quantize it to the given palette using nearest color, no\nfancy error diffusion or anything.\n\n        fromImageDataWithPalette: (imageData, palette) ->\n          {width, height} = imageData\n          paletteData = palette.map colorToRGBA\n\n          width: width\n          height: height\n          data: [0...(width * height)].map (n) ->\n            nearestColorIndex(getColor(imageData, n), paletteData)\n\n    module.exports = Loader\n\nHelpers\n-------\n\n    arrayToHex = (parts) ->\n      if parts[3] < 128\n        \"transparent\"\n      else\n        \"##{parts.slice(0, 3).map(numberToHex).join('')}\"\n\n    # HACK: Infinity keeps the transparent color from being closer than any other\n    # color in the palette\n    TRANSPARENT_RGBA = [Infinity, 0, 0, 0xff]\n\n    colorToRGBA = (colorString) ->\n      if colorString is \"transparent\"\n        TRANSPARENT_RGBA\n      else\n        colorString.match(/([0-9A-F]{2})/g).map (part) ->\n          parseInt part, 0x10\n        .concat [0]\n\n    distanceSquared = (a, b) ->\n      a.slice(0, 3).map (n, index) ->\n        delta = n - b[index]\n\n        delta * delta\n      .sum()\n\n    nearestColorIndex = (colorData, paletteData) ->\n      # TODO: Hack for transparent pixels\n      # Assumes 0 index is transparent\n      # 50% or more transparent then it is 100% transparent\n      # less than 50% it is fully opaque\n      if colorData[3] < 128\n        return 0\n\n      paletteColor = paletteData.minimum (paletteEntry) ->\n        distanceSquared(paletteEntry, colorData)\n\n      paletteData.indexOf(paletteColor)\n\n    getColor = (imageData, x, y) ->\n      stride = 4\n\n      if y?\n        index = (x + y * imageData.width) * stride\n      else\n        index = x * stride\n\n      Array::slice.call imageData.data, index, index + stride\n\n    numberToHex = (n) ->\n      \"0#{n.toString(0x10)}\".slice(-2).toUpperCase()\n",
      "type": "blob"
    },
    "modal.coffee.md": {
      "path": "modal.coffee.md",
      "mode": "100644",
      "content": "Modal\n=====\n\nMessing around with some modal BS\n\n    # HACK: Dismiss modal by clicking on overlay\n    $ ->\n      $(\"#modal\").click (e) ->\n        if e.target is this\n          Modal.hide()\n\n    module.exports = Modal =\n      show: (element) ->\n        $(\"#modal\").empty().append(element).addClass(\"active\")\n\n      hide: ->\n        $(\"#modal\").removeClass(\"active\")\n",
      "type": "blob"
    },
    "palette.coffee.md": {
      "path": "palette.coffee.md",
      "mode": "100644",
      "content": "Palette\n=======\n\nHelpers\n-------\n\n\n\n    fromStrings = (lines) ->\n      lines.split(\"\\n\").map (line) ->\n        \"#\" + line.split(\" \").map (string) ->\n          numberToHex parseInt(string, 10)\n        .join(\"\")\n\n    numberToHex = (n) ->\n      \"0#{n.toString(0x10)}\".slice(-2).toUpperCase()\n\n    TRANSPARENT = [0xff, 0, 0xff]\n    colorToRGB = (colorString) ->\n      # HACK: Use crazy magenta for transparent in palette export.\n      if colorString is \"transparent\"\n        TRANSPARENT\n      else\n        colorString.match(/([0-9A-F]{2})/g).map (part) ->\n          parseInt part, 0x10\n\nExport to Formats\n-----------------\n\n    exportJASC = (array) ->\n      entries = array\n      .map (entry) ->\n        colorToRGB(entry).join(\" \")\n      .join(\"\\n\")\n\n      padding = Math.max(0, 256 - array.length)\n\n      zeroes = [0...padding].map ->\n        \"0 0 0\"\n      .join(\"\\n\")\n\n      \"\"\"\n        JASC-PAL\n        0100\n        256\n        #{entries}\n        #{zeroes}\n      \"\"\"\n\nPalettes\n--------\n\n    Palette =\n\n      defaults:\n        [\n          \"transparent\"\n          \"#000000\"\n          \"#FFFFFF\"\n          \"#666666\"\n          \"#DCDCDC\"\n          \"#EB070E\"\n          \"#F69508\"\n          \"#FFDE49\"\n          \"#388326\"\n          \"#0246E3\"\n          \"#563495\"\n          \"#58C4F5\"\n          \"#E5AC99\"\n          \"#5B4635\"\n          \"#FFFEE9\"\n        ]\n\nhttp://www.pixeljoint.com/forum/forum_posts.asp?TID=12795\n\n      dawnBringer16: fromStrings \"\"\"\n        20 12 28\n        68 36 52\n        48 52 109\n        78 74 78\n        133 76 48\n        52 101 36\n        208 70 72\n        117 113 97\n        89 125 206\n        210 125 44\n        133 149 161\n        109 170 44\n        210 170 153\n        109 194 202\n        218 212 94\n        222 238 214\n      \"\"\"\n\nhttp://www.pixeljoint.com/forum/forum_posts.asp?TID=16247\n\n      dawnBringer32: fromStrings \"\"\"\n        0 0 0\n        34 32 52\n        69 40 60\n        102 57 49\n        143 86 59\n        223 113 38\n        217 160 102\n        238 195 154\n        251 242 54\n        153 229 80\n        106 190 48\n        55 148 110\n        75 105 47\n        82 75 36\n        50 60 57\n        63 63 116\n        48 96 130\n        91 110 225\n        99 155 255\n        95 205 228\n        203 219 252\n        255 255 255\n        155 173 183\n        132 126 135\n        105 106 106\n        89 86 82\n        118 66 138\n        172 50 50\n        217 87 99\n        215 123 186\n        143 151 74\n        138 111 48\n      \"\"\"\n\n      export: exportJASC\n\n    module.exports = Palette\n",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "version: \"0.1.0\"\nentryPoint: \"editor\"\nremoteDependencies: [\n  \"//code.jquery.com/jquery-1.10.1.min.js\"\n  \"//cdnjs.cloudflare.com/ajax/libs/coffee-script/1.6.3/coffee-script.min.js\"\n  \"http://strd6.github.io/tempest/javascripts/envweb-v0.4.6.js\"\n  \"http://strd6.github.io/require/v0.2.2.js?\"\n]\ndependencies:\n  appcache: \"STRd6/appcache:v0.1.0\"\n  compression: \"STRd6/lz-string:v1.3.3\"\n  \"jquery-utils\": \"STRd6/jquery-utils:v0.1.2\"\n  runtime: \"STRd6/runtime:v0.1.1\"\n  \"touch-canvas\": \"STRd6/touch-canvas:v0.2.0\"\n  \"commando\": \"STRd6/commando:v0.9.0\"\n  \"grid-gen\": \"STRd6/grid-gen:v0.1.0\"\nwidth: 1024\nheight: 576\n",
      "type": "blob"
    },
    "style.styl": {
      "path": "style.styl",
      "mode": "100644",
      "content": "html, body\n  margin: 0\n  height: 100%\n\n.editor\n  background-color: lightgray\n  box-sizing: border-box\n  height: 100%\n  padding: 0px 80px 40px 40px\n  position: relative\n  user-select: none\n  overflow: hidden\n\n  .main\n    font-size: 0\n    height: 100%\n    position: relative\n    overflow: auto\n\nhr\n  border-color: gray\n  border-style: solid\n  border-top: none\n\n.icon\n  width: 16px\n  height: 16px\n  display: inline-block\n  box-sizing: border-box\n\n.up\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABcElEQVQ4T2NkoBAw4tNfeDT15L8//35PtJ9rg0sdTgMKDqdcFGeX1Pv77y/Do3cPL8zyWmqIzRAMA0JXhbLJSPBfFeUQV1HgUWL49+8fw43X1xkevn5468e1G7qrG67+QjYIw4CCQym7//z5YyPGLsGhwK/I8O//P4an758yXHpw8cfv378Prkve4YHXAJhkyuao/1by1gx/gS44efskw8sPLyw3p+45ge4NnGEQtyb0v7WyLdAFfxl2nN7BsDF9J1a1OA2IWOr/30bdDmzA9mPbGbbn7yfNgKC5nv/tdB0Y/gIN2HpgK8O+8qOkGeA9xeW/gzHQAGA0btmzheFI/WnSDHDtsfvvaOEEjMa/DBu3b2Y43X6BNAPsWiz+O9u6gMNgw8aNDBf7r5FmgEWN0X9XZzewAevXbGC4Nu02aQYYlej8d/dwZ/gHhOtWbGC4Pec+aQbo5Kr///P7L8Of338Y/v75y3B/4WPSDCA2lwMAYbWkEeqTidIAAAAASUVORK5CYII=) \n\n.down\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABbUlEQVQ4T2NkoBAw4tJffDz9//9//xn+/vkHxH8ZpjjPx6oWpwGFR1L/W4rYMPz7/49h/4O9DDM9l5BmQN7+pP8W4tYM//79Y9h3dy/DPP8VpBmQuSvuv6UU0ACgC/Zc282wJHwdaQakbI76byVvzfAX6ILdF3cxrIrfTJoBcWtC/1sr2wJd8Jdhx+kdDBvTd5JmQMRS//826nZgA7Yf286wPX8/aQYEzfX8b6frwPAXaMDWA1sZ9pUfJc0A7yku/x2MgQb8+8uwZc8WhiP1p4k3wHOSgwU3O+9xI21jYDT+Zdi4fTPD6fYLxBngMcFhx+9ff+w1lDQ4xEQlwGFw4eJFhtu3bv/48/vvkVuz7rkip14MU7UbtNkEGbkvS4lLqamra4ANOH/uAsPtG3fv3P54T5thNcMvvAbAJA1LtM9LS8kY/P37l+HOjbuXbs+9r48t3+DMCyDF6unKR4AZifXO3AfmuDIdXgOIyekAYp2eEfJ3A60AAAAASUVORK5CYII=)\n\n.minus\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACpUlEQVQ4T6WT/UtTURjHv/fqNuesMWs0XzLyhUSKxEhUsBw2SFHRhkaGikG+QP4FgWJ/QSBBRD+oPxgEi3LiC6lQ9oNkZJiK7CV1g6ml4gu7d96dc27XDa2V9kvPj+d5ns855/t8Hw7/Gdyf/Z6mpjTG87WEY/WyREwMFJDpahCsV6ZC36We1+7feyIASy0PrDJI18msjARddjY4gx4IiAiu+rA5OorNjfUVRklbzgu77QByCNhvVm7qibcU6XTZl0Hdc8CaF5AkcHEGcOdSsGEfhHfJ6SeENuS9HAlBQoDl1tZUWcbEqWv5ibFXc0DH+yGIAXA0CI1aBY7JkKUAkJWDH8Nv4V3z+CgNFBbaPnwLARabm9t1ScbO+FtVYJNjoMIuRFFEjCRGSET9IlS5Zix0P8OWCh1FtolHIYC79b7TZLmeriIBCMsOkK8ROh1C1CY9+DMp8G+LmJ995zK/mswIAZwt94SUyjIt5/gCYWcb+oePjxzu9zvlUBkMiLqSh0/93WJx/1RsCOBorBPOlhRrOec0mPIKbfvTYwHcCT00uQX4OPBctLyZDgPmG+86TVkZ6VoVBfEsQvBtHW0vnocm8yJ2AhLmp4ddN4dmw1+Yqatu1wb8nUnVtyGNDIDxBMHdYKSAypjAq6EvKcdn2xPsSv6O0qGFsIgztdZUomYTxlh9Yry5CKLdDsUwii2o4kOlhDKlKhonyyrgGR/E8tqcjxJWWDbqCI9xP6ZqSq3gaY8x7rTOaLZAWnJDcrvBJAbNhXSok8/DO2bH4rrDT3jWUDG48MtIB5DJmhtWQklXDAsmJGfmQ21KDKUEnweuufcQiLhCeLntoHk/99cyjVUWpEUxWkujUS8zYpL3giDRbFUmtHdvL9hXNe46fpmOlv7fpz8BWfs5IPbTMp0AAAAASUVORK5CYII=)\n\n.plus\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC1ElEQVQ4T6WTWUhUURjH/3NdJ3EpxBkXChw1FVFJTbBMJSGSikAqSlAfIloY0ITKEE0rbXmI9MFKihSyTSHQMbUQy9weLC1NzVFDc4/EGe8dZ+4953bnirZKD33n7XD+v+98y1+B/wzF7/qLdVqNLaM4wgs0lRCiFigBT4RpCxEqOJO58k764+GfNb8AiupPJ1ORlmxUaTwD1WFQ2jnDQi2YWZxA+1ATZuZmp3hCtPfSq6tXIKsAq1gUSXmkf5xTgEco9IZBTJsmwFMervau8FB6o3WwAb36j6xAhLSHx+pkiAwoqs30FW1IS7hmm1eAKgzNUw3gWA68KMDR0QGidMzUjCCXELQNvMTgiH6SM3Oxusw3IzKgsE6b67ZelZ+weR865l5j0cKCZVmcjc6Xf3r5bTZMrAGMnS2i1bGoaLoN1sjn6TJeFciA/JpTQ5HB8X5mxoLhr0NS3TyMRgOKdhbLgJNVKXB2s4NABQRIvTEbWeg6X+gbs9r8ZUDOs+Ncwpa9ykFjH+YX53F+a+Ffh5tRfxguSjeEuEeitK7M1Hymc50MOFd9lIsJT1T2G3phIkvIi7i+JsDZ3gWhqijcrLllas3uWgZkPUkb8vMN9qMOIr4YxsDxS2BnDSg78FQGWTNbg1Ew8HcPBrfAoapdp+/I6VkuQfsoJdfCmPL3RBxC63gjlggPe6rA1cT7qwBKRNgztoj3S8KN2mIsGBbzui70LTfxxINkX15gWtQqd68ozQ60fq6XG0akLRSJ9YUIO8YGcZokNHTr0N7fM8kvCbEfrnxaHqM10u7uTyaUL/dWq51iAxMxvjCKiflRiJTCZ4MvfFw24Xl3DTr6e1lpvdPeFwz8WKQVyMHSXck8JSXURvCMC9oOlaunNTnGv42h4V0TDEZ2ihepdkVs1f1hpt3XYjTURjITJalEECQzCZKZyLRkrgqemit7L+nXNtNfZ/ePy+9WQGAgmKlaSQAAAABJRU5ErkJggg==)\n\n.toolbar\n  background-color: white\n  box-sizing: border-box\n  height: 100%\n  width: 40px\n  position: absolute\n  top: 0\n  left: 0\n\n  .tool\n    background-color: lightgray\n    background-position: center\n    background-repeat: no-repeat\n    width: 36px\n    height: 36px\n    box-sizing: border-box\n    border: 1px solid rgba(0, 0, 0, 0.5)\n    border-radius: 2px\n    margin: 2px\n\n    &.active\n      background-color: white\n      border-color: green\n\n.layers\n  background-color: white\n  box-sizing: border-box\n  font-size: 14px\n  height: 100%\n  width: 40px\n  position: absolute\n  top: 0\n  right: 0\n\n  .layer\n    padding: 8px 0 2px\n    position: relative\n\n    &.active\n      canvas\n        border-color: green\n\n    &.hidden\n      opacity: 0.5\n\n    .eye\n      position: absolute\n      top: 0\n      right: 0\n      width: 16px\n      height: 16px\n      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACnElEQVQ4T6WT30uTYRTHv8/27n33y/ljaptLzGpEoEZBQRKYBBFdREUXQhFddRNdRBF2ZX9BVJDQpRddRaQhWlBkISoqU2ammWtzzl85N51u757nffa8vZskSHd54Fye7/mcc76HYI9B9liPXQKhUOiMbNIeEXWtmbCMjQgO5IwUOYCYKezuUa3I11pTU9P/t/GOQDQa7TCrqy1mFpdlkwSNZbGeSIIzBsUMVLgcyDEKLnRd+E50e/z1l/IiBQGj+IO0ETovQ0NsYRHRpQSyxAlN8UDLETAu4OArqMIi6qvdMBlEoqp+ovzYuQYSDoefKOrCPVlLIfgjAvnAWcSoF5pBTjUdWSOpJqAygbpqGUdT3XCkwnBazEgdbO4gsdngMknO7NvQS+A/3oSeQAbraVEofni9AQYwHrSPG0ICVgtB69UyxKeGICZ6sbrJOQkPdwqbp44UV/ggSRLeDqWxtsVBDYK2W9sCd56NgVIBu2JCW0s5OOdIL/xE5N0LkFgkxO2uUrMsy7BYLOifVjEepsgayPmulOVHyI8icMpvx40mFzRNAzOWm/z6SifR4JeE4qosVUq8BYLldYFPwTTmfmvI8u3583vwFEu41lgEv9dSIFANAnXkDSNzM99eKonp2yaHG2Z3LUy2YkRXGcZ+ZfF9nhoX0HHYI+Ok34Yj+60QNAMtEgAd7UJU8g0WzjgdGBhwrE2etkkEelltUndUZom9lOmSLP4aRtd1IB6xitCgl81PYirrWLpw/6lvx0jDfe+76PLMxSqSkpx2K6C4ICx2Y4mGWQxH8q0ksDKLcHxT3yw5NDry+nPj474+vsvKPc/vKiylXmaMXjFgmmUQp5lwomtCZKgaUFXaqeu892b7x6l/rPy/T7Xnb/wDHedWhDseHEQAAAAASUVORK5CYII=)\n\n  .thumbnail\n    padding: 2px 0\n\n  canvas\n    box-sizing: border-box\n    border: 1px solid lightgray\n    display: block\n    margin: auto\n\n.palette\n  background-color: white\n  box-sizing: border-box\n  height: 100%\n  width: 40px\n  position: absolute\n  top: 0\n  right: 40px\n  font-size: 0\n\n  .color\n    box-sizing: border-box\n    border: 1px solid rgba(0, 0, 0, 0.5)\n    border-radius: 2px\n    float: left\n    width: 16px\n    height: 16px\n    margin: 2px\n\n    &.current\n      float: none\n      width: 36px\n      height: 36px\n\n.vertical-center\n  position: absolute\n  top: 0\n  bottom: 0\n  left: 0\n  right: 0\n  margin: auto\n\n.viewport\n  background-color: white\n  border: 1px solid gray\n  margin: auto\n\n  canvas\n    background-color: transparent\n    position: absolute\n\n  .overlay\n    pointer-events: none\n    position: absolute\n    z-index: 1\n\n.debug\n  background-color: white\n  box-sizing: border-box\n  position: absolute\n  width: 100%\n  height: 100px\n  bottom: 0\n  margin: 0\n  padding: 1em\n\n.actions\n  background-color: white\n  box-sizing: border-box\n  width: 100%\n  height: 40px\n  padding: 0px 40px\n  position: absolute\n  bottom: 0\n  left: 0\n\n  .action\n    background-color: lightgray\n    background-position: center\n    background-repeat: no-repeat\n    width: 36px\n    height: 36px\n    box-sizing: border-box\n    border: 1px solid rgba(0, 0, 0, 0.5)\n    border-radius: 2px\n    display: inline-block\n    margin: 2px\n\n#modal\n  background-color: rgba(0, 0, 0, 0.25)\n  display: none\n  position: absolute\n  z-index: 9000\n  top: 0\n\n  input[type=file]\n    box-sizing: border-box\n    padding: 5em 2em\n    width: 320px\n    height: 180px\n\n  & > *\n    background-color: white\n    border: 1px solid black\n    margin: auto\n    position: absolute\n    top: 0\n    bottom: 0\n    left: 0\n    right: 0\n\n  &.active\n    display: block\n    width: 100%\n    height: 100%\n",
      "type": "blob"
    },
    "templates/debug.haml.md": {
      "path": "templates/debug.haml.md",
      "mode": "100644",
      "content": "Debug Some junk\n\n    %pre.debug\n      - each @items, (item) ->\n        = item\n",
      "type": "blob"
    },
    "templates/editor.haml.md": {
      "path": "templates/editor.haml.md",
      "mode": "100644",
      "content": "Editor template\n\n    - activeIndex = @activeIndex\n    - activeTool = @activeTool\n    - editor = this\n\n    .editor\n\nThe toolbar holds our tools.\n\n      .toolbar\n        - each @tools, (tool) ->\n          - activeClass = -> \"active\" if tool is activeTool()\n          .tool(style=\"background-image: url(#{tool.iconUrl})\" class=activeClass)\n            -on \"click\", (e) ->\n              - activeTool(tool)\n\nOur layers and preview canvases are placed in the viewport.\n\n      .main\n        .viewport\n          .overlay\n\nThe palette holds our colors.\n\n      .palette\n        .color.current\n        - each @palette, (color, index) ->\n          .color(style=\"background-color: #{color}\")\n            - on \"click\", ->\n              - activeIndex index\n            - on \"touchstart\", ->\n              - activeIndex index\n\n      .layers\n        .thumbnail\n        Layers\n        - layers = -> editor.layers().copy().reverse()\n        - each layers, (layer, index) ->\n          - activeClass = -> \"active\" if layer is editor.activeLayer()\n          - hiddenClass = -> \"hidden\" if layer.hidden()\n          .layer(class=activeClass class=hiddenClass)\n            - on \"click\", ->\n              - editor.activeLayer layer\n            = layer.previewCanvas\n            .eye\n              - on \"click\", ->\n                - layer.hidden !layer.hidden()\n        %hr\n        .up.icon\n        .down.icon\n        %hr\n        .plus.icon\n        .minus.icon\n\n      .actions\n        - each @actions, (action) ->\n          .action(style=\"background-image: url(#{action.iconUrl})\")\n            - on \"click\", ->\n              - action.perform()\n            - on \"touchstart\", ->\n              - action.perform()\n\nModal junk\n\n    #modal\n",
      "type": "blob"
    },
    "test/editor.coffee": {
      "path": "test/editor.coffee",
      "mode": "100644",
      "content": "require \"../editor\"\n\ndescribe \"editor\", ->\n  it \"should be radical\", ->\n    assert true\n",
      "type": "blob"
    },
    "tools.coffee.md": {
      "path": "tools.coffee.md",
      "mode": "100644",
      "content": "Tools\n=====\n\n    {line, circle, rect, rectOutline} = require \"./util\"\n\n    line2 = (start, end, fn) ->\n      fn start\n      line start, end, fn\n\n    neighbors = (point) ->\n      [\n        Point(point.x, point.y-1)\n        Point(point.x-1, point.y)\n        Point(point.x+1, point.y)\n        Point(point.x, point.y+1)\n      ]\n\n    shapeTool = (fn, icon) ->\n      start = null\n\n      iconUrl: icon\n      touch: ({position})->\n        start = position\n\n      move: ({editor, position})->\n        editor.preview ->\n          fn start, position, editor.draw\n\n      release: ({position, editor}) ->\n        fn start, position, editor.draw\n\nDefault tools.\n\n    TOOLS =\n\nDraw a line when moving while touching.\n\n      pencil: do ->\n        previousPosition = null\n\n        iconUrl: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA5klEQVQ4T5VTuw2DMBB9LmkZg54ZGCDpHYkJYBBYATcUSKnSwAy0iDFoKR0fDgiMDc5JLvy59969OzPchzSesP3+sLFgySoMweMYou/xmWe81VKx5d0CyCQBoghoGgiV/JombwDNzjkwjsAw/A8gswwgBWm6VPdU7L4laPa6BsrSyX6oxTBQ7munO1v9LgCv2ldCWxcWgDV4EDjZbQq0dDKv65ytuxokKdtWO08AagkhTr2/BiD2otBv8hyMurCbPHNaTQ8OBjJScZFs9eChTKMwB8byT5ajkwIC8E22AvyY7j7ZJugLVIZ5EV8R1SQAAAAASUVORK5CYII=\"\n        touch: ({position, editor})->\n          editor.draw position\n          previousPosition = position\n        move: ({editor, position})->\n          line previousPosition, position, editor.draw\n          previousPosition = position\n        release: ->\n\n      fill:\n        iconUrl: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABCklEQVQ4T52TPRKCMBCFX0pbj+HY0tJKY+UB8AqchCuYXofCRs9gy3ADW1rKmLeQTIBEZ0wTwu779idZhfQygUml3FIGikPb8ux5MUDM+S9AWAIjRrNNZYDLdov7MEiqx80G576PQqIAJ75NgJMFXPMc6vlcQZYAI842unq/YQ4HoKrGho1iqLqeQWadZuSyLKG1FmeWwMjY7QDCJlAIcQAj4iyDfr1kp4gggVgb9nsPUkXhs1gBJBpX1wFtC20BrpmSjS0pDbD1h8uJeQu+pKaJAmgfy5icQzH/sani9HgkAWLnLTAi0+YeiFmu+QXwEH5EHpAx7EFwld+GybVjOVTJdzBrYOKwGqoP9IV4EbRDWfEAAAAASUVORK5CYII=\"\n        touch: ({position, editor}) ->\n          index = editor.activeIndex()\n          targetIndex = editor.getPixel(position).index\n\n          return unless targetIndex?\n          return if index is targetIndex\n\n          queue = [position]\n          editor.draw position\n\n          # TODO: Allow for interrupts if it takes too long\n          {width, height} = editor.pixelExtent()\n          safetyHatch = width * height\n\n          while(queue.length and safetyHatch > 0)\n            position = queue.pop()\n\n            neighbors(position).forEach (position) ->\n              if editor.getPixel(position)?.index is targetIndex\n                # This is here because I HAVE been burned\n                # Later I should fix the underlying cause, but it seems handy to keep\n                # a hatch on any while loops.\n                safetyHatch -= 1\n\n                editor.draw position\n                queue.push(position)\n\n          return\n\n        move: ->\n        release: ->\n\nShapes\n------\n\n      circle: shapeTool circle,\n        \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAVklEQVQ4T2NkwA7+YxFmxKYUXRCmEZtirHLICkEKsNqCZjOKOpgGYjXDzIKrp4oBpNqO4gqQC0YNgAQJqeFA3WjESBw48gdWdVTNC8gWk50bCbgeUxoAvXwcEQnwKSYAAAAASUVORK5CYII=\"\n\n      rect: shapeTool rect,\n        \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAK0lEQVQ4T2NkoBAwUqifYfAY8J9MrzDCvDBqAAPDMAgDMpMBwyBKymR7AQAp1wgR44q8HgAAAABJRU5ErkJggg==\"\n\n      rectOutline: shapeTool rectOutline,\n        \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAN0lEQVQ4T2NkoBAwUqifgWoG/CfTJYwwF4AMINU1YD2jBgy7MCAnLcHTATmawXpITX0YFlFsAADRBBIRAZEL0wAAAABJRU5ErkJggg==\"\n\n      line2: shapeTool line2,\n        \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAV0lEQVQ4T6XSyQ0AIAgEQOm/aIWHxoNzJTG+GASk9hnE+Z2P3FDMRBjZK0PI/fQyovVeQqzhpRFv+ikkWl+IRID8DRfJAC6SBUykAqhIFXgQBDgQFFjIAMAADxGQlO+iAAAAAElFTkSuQmCC\"\n\n    module.exports = (I={}, self=Core(I)) ->\n      self.extend\n        addTool: (tool) ->\n          self.tools.push tool\n\n        activeTool: Observable()\n\n        tools: Observable []\n\n      # TODO: Probably want to let the editor add its own tools so this is more\n      # reusable\n      Object.keys(TOOLS).forEach (name) ->\n        self.addTool TOOLS[name]\n\n      self.activeTool(self.tools()[0])\n\n      return self\n",
      "type": "blob"
    },
    "undo.coffee.md": {
      "path": "undo.coffee.md",
      "mode": "100644",
      "content": "Undo\n====\n\nCommand Stack\n-------------\n\nTODO: Re-extract this later\n\nTODO: Integrate Observables?\n\nA simple stack based implementation of executable and undoable commands.\n\n    CommandStack = (stack=[]) ->\n      index = stack.length\n\n      execute: (command) ->\n        stack[index] = command\n        command.execute()\n\n        index += 1\n\n        # Be sure to blast obsolete redos\n        stack.length = index\n\n        return this\n\n      undo: ->\n        if @canUndo()\n          index -= 1\n\n          command = stack[index]\n          command.undo()\n\n          return command\n\n      redo: ->\n        if @canRedo()\n          command = stack[index]\n          command.execute()\n\n          index += 1\n\n          return command\n\n      current: ->\n        stack[index-1]\n\n      canUndo: ->\n        index > 0\n\n      canRedo: ->\n        stack[index]?\n\n      stack: ->\n        stack.slice(0, index)\n\n    module.exports = CommandStack\n\nAn editor module for editors that support undo/redo\n\n    module.exports = (I={}, self=Core(I)) ->\n      # TODO: Module include should be idempotent\n      self.include Bindable unless self.on\n\n      commandStack = CommandStack()\n      lastClean = undefined\n\n      # TODO: Make this an observable rather than an event emitter\n      dirty = (newDirty) ->\n        if newDirty is false\n          lastClean = commandStack.current()\n          self.trigger('clean')\n\n          return self\n        else\n          return lastClean != commandStack.current()\n\n      updateDirtyState = ->\n        if dirty()\n          self.trigger('dirty')\n        else\n          self.trigger('clean')\n\n      # Set dirty state on save event\n      self.on 'save', ->\n        dirty(false)\n\n      self.extend\n        history: (newHistory=[]) ->\n          if arguments.length > 0\n            commandStack = CommandStack newHistory.map self.Command.parse\n          else\n            commandStack.stack()\n\n        execute: (command) ->\n          commandStack.execute command\n          updateDirtyState()\n\n          return self\n\n        undo: ->\n          commandStack.undo()\n          updateDirtyState()\n\n          return self\n\n        redo: ->\n          commandStack.redo()\n          updateDirtyState()\n\n          return self\n\n      return self\n",
      "type": "blob"
    },
    "util.coffee.md": {
      "path": "util.coffee.md",
      "mode": "100644",
      "content": "Util\n====\n\nDeferred\n--------\n\nUse jQuery deferred\n\n    global.Deferred = jQuery.Deferred\n\nHelpers\n-------\n\n    isObject = (object) ->\n      Object::toString.call(object) is \"[object Object]\"\n\nSize\n----\n\nA 2d extent.\n\n    Size = (width, height) ->\n      if isObject(width)\n        {width, height} = width\n\n      width: width\n      height: height\n      __proto__: Size.prototype\n\n    Size.prototype =\n      scale: (scalar) ->\n        Size(@width * scalar, @height * scalar)\n\n      toString: ->\n        \"Size(#{@width}, #{@height})\"\n\n      max: (otherSize) ->\n        Size(\n          Math.max(@width, otherSize.width)\n          Math.max(@height, otherSize.height)\n        )\n\n      each: (iterator) ->\n        [0...@height].forEach (y) ->\n          [0...@width].forEach (x) ->\n            iterator(x, y)\n\nPoint Extensions\n----------------\n\n    Point.prototype.scale = (scalar) ->\n      if isObject(scalar)\n        Point(@x * scalar.width, @y * scalar.height)\n      else\n        Point(@x * scalar, @y * scalar)\n\nExtra utilities that may be broken out into separate libraries.\n\n    module.exports =\n\n      Size: Size\n\nA 2d grid of values.\n\n      Grid: (width, height, defaultValue) ->\n        generateValue = (x, y) ->\n          if typeof defaultValue is \"function\"\n            defaultValue(x, y)\n          else\n            defaultValue\n\n        grid =\n          [0...height].map (y) ->\n            [0...width].map (x) ->\n              generateValue(x, y)\n\n        self =\n          contract: (x, y) ->\n            height -= y\n            width -= x\n\n            grid.length = height\n\n            grid.forEach (row) ->\n              row.length = width\n\n            return self\n\n          copy: ->\n            Grid(width, height, self.get)\n\n          get: (x, y) ->\n            return if x < 0 or x >= width\n            return if y < 0 or y >= height\n\n            grid[y][x]\n\n          set: (x, y, value) ->\n            return if x < 0 or x >= width\n            return if y < 0 or y >= height\n\n            grid[y][x] = value\n\n          each: (iterator) ->\n            grid.forEach (row, y) ->\n              row.forEach (value, x) ->\n                iterator(value, x, y)\n\n            return self\n\nExpand the grid using the given `defaultValue` value or function to fill any\npositions that need to be filled.\n\n          expand: (x, y, defaultValue) ->\n            newRows = [0...y].map (y) ->\n              [0...width].map (x) ->\n                if typeof defaultValue is \"function\"\n                  defaultValue(x, y + height)\n                else\n                  defaultValue\n\n            grid = grid.concat newRows\n\n            grid = grid.map (row, y) ->\n              row.concat [0...x].map (x) ->\n                if typeof defaultValue is \"function\"\n                  defaultValue(width + x, y)\n                else\n                  defaultValue\n\n            height = y + height\n            width = x + width\n\n            return self\n\nReturn a 1-dimensional array of the data within the grid.\n\n          toArray: ->\n            grid.reduce (a, b) ->\n              a.concat(b)\n            , []\n\n        return self\n\nCall an iterator for each integer point on a line between two integer points.\n\n      line: (p0, p1, iterator) ->\n        {x:x0, y:y0} = p0\n        {x:x1, y:y1} = p1\n\n        dx = (x1 - x0).abs()\n        dy = (y1 - y0).abs()\n        sx = (x1 - x0).sign()\n        sy = (y1 - y0).sign()\n        err = dx - dy\n\n        while !(x0 is x1 and y0 is y1)\n          e2 = 2 * err\n\n          if e2 > -dy\n            err -= dy\n            x0 += sx\n\n          if e2 < dx\n            err += dx\n            y0 += sy\n\n          iterator\n            x: x0\n            y: y0\n\n      rect: (start, end, iterator) ->\n        [start.y..end.y].forEach (y) ->\n          [start.x..end.x].forEach (x) ->\n            iterator\n              x: x\n              y: y\n\n      rectOutline: (start, end, iterator) ->\n        [start.y..end.y].forEach (y) ->\n          if y is start.y or y is end.y\n            [start.x..end.x].forEach (x) ->\n              iterator\n                x: x\n                y: y\n          else\n            iterator\n              x: start.x\n              y: y\n\n            iterator\n              x: end.x\n              y: y\n\ngross code courtesy of http://en.wikipedia.org/wiki/Midpoint_circle_algorithm\n\n      circle: (start, endPoint, iterator) ->\n        center = Point.interpolate(start, endPoint, 0.5).floor()\n        {x:x0, y:y0} = center\n        {x:x1, y:y1} = endPoint\n\n        extent = endPoint.subtract(start).scale(0.5).abs().floor()\n\n        radius = Math.min(\n          extent.x\n          extent.y\n        )\n\n        f = 1 - radius\n        ddFx = 1\n        ddFy = -2 * radius\n\n        x = 0\n        y = radius\n\n        iterator Point(x0, y0 + radius)\n        iterator Point(x0, y0 - radius)\n        iterator Point(x0 + radius, y0)\n        iterator Point(x0 - radius, y0)\n\n        while x < y\n          if f > 0\n            y--\n            ddFy += 2\n            f += ddFy\n\n          x++\n          ddFx += 2\n          f += ddFx\n\n          iterator Point(x0 + x, y0 + y)\n          iterator Point(x0 - x, y0 + y)\n          iterator Point(x0 + x, y0 - y)\n          iterator Point(x0 - x, y0 - y)\n          iterator Point(x0 + y, y0 + x)\n          iterator Point(x0 - y, y0 + x)\n          iterator Point(x0 + y, y0 - x)\n          iterator Point(x0 - y, y0 - x)\n",
      "type": "blob"
    }
  },
  "distribution": {
    "actions": {
      "path": "actions",
      "content": "(function() {\n  var Actions, FileReading, Modal, Palette, compress, decompress, loader, namespace, retrieve, saveAs, state, store, _ref;\n\n  loader = require(\"./loader\")();\n\n  FileReading = require(\"./file_reading\");\n\n  Modal = require(\"./modal\");\n\n  Palette = require(\"./palette\");\n\n  saveAs = require(\"./lib/file_saver\");\n\n  _ref = global.Compressor = require(\"compression\"), compress = _ref.compressToUTF16, decompress = _ref.decompressFromUTF16;\n\n  module.exports = Actions = function(I, self) {\n    if (I == null) {\n      I = {};\n    }\n    if (self == null) {\n      self = Core(I);\n    }\n    self.extend({\n      addAction: function(action) {\n        return self.actions.push(action);\n      },\n      actions: Observable([])\n    });\n    Object.keys(Actions.defaults).forEach(function(hotkey) {\n      var icon, method, _ref1;\n      _ref1 = Actions.defaults[hotkey], method = _ref1.method, icon = _ref1.icon;\n      self.addAction({\n        perform: function() {\n          if (typeof method === \"function\") {\n            return method({\n              editor: self\n            });\n          } else {\n            return self[method]();\n          }\n        },\n        iconUrl: icon\n      });\n      return self.addHotkey(hotkey, method);\n    });\n    return self;\n  };\n\n  state = null;\n\n  namespace = \"/pixel-editor/saves/\";\n\n  store = function(name, data) {\n    return localStorage[\"\" + namespace + name] = compress(JSON.stringify(data));\n  };\n\n  retrieve = function(name) {\n    try {\n      return JSON.parse(decompress(localStorage[\"\" + namespace + name]));\n    } catch (_error) {\n\n    }\n  };\n\n  Actions.defaults = {\n    \"ctrl+z\": {\n      method: \"undo\",\n      icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACRklEQVQ4T6VTXUhTYRh+p47sbhcR2zmMDGXUTVBBiyBdJUjU6EJ2K4R0ESm6CyEo6qKZWcGkoC6KFt2GxKhwi4JKbcg2khmonVW6RbmGnnI1z873c3rPjp6aQQw88PJ834H3+b73eZ7PAhv8LBvsB5PAP3pK45wDZxyYXpQZSBjHWiSUJTmlUaVQGg6feZZdO9gk6HnZqXnEw6BpAFxjWBowRGwHhSgg/5RhQc6B9FkKq0ppMOJ/FdNJTIKuFye1Q84jwLGBAzbrqOENyiQciuQX1NVYIbOQgcR0IqwUV7pfn49nTYLT0Q7NuDYDShBxTfU9rgWbCA32BrDWWZGQQ2o2Be8/Sv7RCxNDVYnovdUaJCptb9njcTILhe/yDxiPxyKxS4mjVRHos7ZeOxh0bXP1ig4RiKrCk+eRfGJgcmsFgc8HteD1nn3Y8bh/vb3Nl93BHdt39oqCAKpK4Gl0JD95/d06ggfeECV076POkV1/EzQH3EHUpL3lgMdJawgsLxVgfOxNZOrGzJ8RfPeP3XTYxC5duLmvn8pCIpkhoh1FdKKIm6zoEoqYmgJpVvJP304bIvpCx6/abY6+JrHJtFB3Y81CHQulZaiv3QzzmSwk44mwulLs/hD6Yth44k5bQLAJ5xqdjeg9GBnAouUsYJAUBRblJcjlvkF6RgqjI4Ppe/OVQWoLeoaELY4eivGdy6yOsJoDHCWPoyUZoVFKlGH95H+irP/wBPbfpYztG7sYrxDxfw+uMgdoo9u1u2+i/+2Val/pb35FXyDc5lZBAAAAAElFTkSuQmCC\"\n    },\n    \"ctrl+y\": {\n      method: \"redo\",\n      icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACUUlEQVQ4T6WTUUhTURjHv+scNheypmOy7RY0H7IHC6Rgo/ItB0GXWIgSBUOJMIRFkEUlBEWBDzOsXnoQpIdqTUlrQ6k9NPBhUeCaFO0udxuB7bVc5D3n3L5zYNZSiNG9nHu+C+f/4/v+33ck+M9HqkXf9/DYRRKbHo1GgVZ0NQF6Jo9miE7SU/3xgU0Bg3Mh2TBIkBpGNyWkkxHmIIQC1Snw3WVzA8Nd/ZK/HR9KhjlkPYOzL075KDWGPVZZ2dZoB6vZCvV19UANBDAGjCEEY50SeJfLgFpQbyQvLVwRgMG5XpkZ5vH2lt2K09oKP0gZTJIZmMFQzAEUYwRwCK7FD4ugaupo6mr6ggCcjp8Iy03bI157mxCtrpVBXcnB8sqySF2UoBNwtbiBUgr5Qv5OaiQ9tF7CwLO+REfr3kCj2YIHGCSzySIejD0JPT/3Z5e6bvoyTCdvUiOvQ1UmhqZ7Sv6dBx11aIlW0iD7OTs21Z+oEnOB/9r+ywvZ9C34u40nHwdL/rYDDklCwFcNlgpLYzNn5jcANpsZ4UHvAyXRIe8JWCxbsFYs4e3LIl2jsfnzr/4JEYDjE0fCbrsn4nV5sW1oYnkVchqaWEQT0cDKHFA0VPyjke/v5YRWfJS7h2Xs9PiuHe2Ko9kJ339+gwZTg2gZbx/DORAxvnwmZqKz8PH+p98ADglEunw6YcMep0exNdlgq9UKkskEBp8FXByEEwoGgp4+moX8hFYN4JBD1/fJlBhBTLWbENZJCGlmOqvjqfP2VnaGcWGyuBFQy82snP0Ffg5KIO/aNV0AAAAASUVORK5CYII=\"\n    },\n    \"ctrl+o\": {\n      method: function(_arg) {\n        var editor;\n        editor = _arg.editor;\n        return Modal.show(FileReading.readerInput({\n          image: function(dataURL) {\n            return loader.load(dataURL).then(function(imageData) {\n              return editor.handlePaste(loader.fromImageDataWithPalette(imageData, editor.palette()));\n            });\n          },\n          json: function(data) {\n            return editor.restoreState(data);\n          },\n          text: function() {},\n          chose: function() {\n            return Modal.hide();\n          }\n        }));\n      },\n      icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACsklEQVQ4T6WTW0iTYRjH/3Nu002JrOmQliRTWoZFhHRR0RzbhZA3gSzJBibYRQTeRlC3RgXVTSBCBJINE0zxQJsHMC2RglirdVBnM9e3tYM7+p3W+37h6Ouim56bD97v/f/4P//nfRT4z1L8qR8fH9cUFxe35vP584IgHCT/6sTf5SVnX8i3n+M4T1tbm7CjKwCI+JBSqXxSVVXVaDAYoNPpoNVqQYRIJBJIJpMIBAJgGGaenDkIZINCCoDJyckZs9l8xmg0QqGQGSuY5HkeXq8Xfr//scPhcMoAExMTjMVi0avV6n8CYrEY3G53uL29vVIGIC1IgHg8jpKSEmg0GqhUKqmFTCaDaDSKYDAIk8kEj8cT7ujokAPGxsaY5uZmfTqdlvrN5XKSmNqmGWxvb4MEjPr6esmB0+mUA0ZHRyUAvUjFVEgFJHVEIhE88l1FlkvjmvUZZj1z4c7OTjlgZGSEsVqtemo3m81KAJoHBYTDYfT7rqB6jwm+jTewqnoi3V2X9bIMhoeHGZvNpk+lUlLP9xadyIscWJEHS2DVFXVoNJ7E0uo03gVf4/vWj/L3N5EqzGtoaIix2+1SiBRwf+kibIedEPIiBFGAiDxC8SB2l1Vi8asby4E5MbbFVhQALpdLAtC0KeDu0gW0HLmEQOQzOOKCJ244gUNRkRqV5fswvzKFVysvhQJgcHCQaWpq0pNCKBTCjZmzaD3aTYQCeEGQnGwm1lFRZsDbbwt48WEqnGZhLwAGBgZayFt3NTQ06GpqatD19DhyLEsyYJHjOdTuNeNErR3L6wuY9nt+JnPi6egd+GRvtq+v7wAZ3XUCOkf2YhfdBToN2tbDaE/+2P5TitlP05sZHpbILfhlU/h7q3t7e8tLS0tNZIzi2trax+e7HkRFUandYoXaxG2s7tz/BeoVfR66j3EiAAAAAElFTkSuQmCC\"\n    },\n    \"ctrl+s\": {\n      method: function(_arg) {\n        var blob, data, editor, name;\n        editor = _arg.editor;\n        if (name = prompt(\"Name\", \"file\")) {\n          data = editor.saveState();\n          delete data.history;\n          blob = blob = new Blob([JSON.stringify(data)], {\n            type: \"application/json\"\n          });\n          return saveAs(blob, \"\" + name + \".json\");\n        }\n      },\n      icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC4klEQVQ4T32T70tTURjHv8fpppuaQkuhlgU2f4wCs6b4QpxLod9BJSaYEOS7+gOiF/VCYvjKepf0IsFfU6wxUSNFiALJ9NWi7AelbmbX2qZzv9zdvT3nSOAMei6Xe++55/mc7/N9zmGgGBsb06Wnp19QVfVaMpkspaEjynZ4aOwLPZ8kEomppqamJJ+/Mxgll2s0mv6CgoJjhYWFMBgM0Ov1oESsr68jFAphcXERkiS9prFmgvhSABMTE9NlZWV1JpMJjLHdC4hvWZbh8XiwsLDQ09zc3JYCGB8fl2w2m1Gr1f4XEAgEMDk5udbS0rJvdwkCEAwGkZmZCZ1Oh4yMDFFCJBKB3++H1+tFcXExpqam1lpbW1MBo6OjUn19vTEcDot6Y7GYSOayuQfxeBxkMMxms1DQ1taWCnC73QLAJ/JknsgTHjz3I0cHRLZk5GdrsSJFwdKAbL0GisoQ2Iji5exSFXO5XJLdbjdyudFoVAC4H/cHf+KsrQSXjmfDPePF+eoDKQY/nV7D9NtvYCMjI1JDQ4Nxc3NT1MwB3Ic7vT9grynFjbo83H40h4e3KgUgJgNbtBsej/nw/vMy2PDwsNTY2ChM5ADaSAJwb+gXTlWVoKU2F4yuNOqwSgBFUalbgGPoO+Y/EMDpdAoAd5sDaNchKysLDlcAJyyH4PsdEslyUoFCN4dwk/mLb2UFbGBgQLJarUYKrK6uCh84oOOZHxXlJjKLNNNsWU4KOFegqAp9J6i9BOjt7T1DP5wWi8VQVFQk5PMdeb1zHvaTJbhSmwVZ2SIItYAvzBRkpmvR2beEWc8nKo6iu7v7MLXuLoEu07nYw89Cn6cQp6uO4mJtAt2z7dhrOMidwFp4Ge3WLnT1xzE9924bsDMcDkcOlVD8Klg5f/NcORor/JgJDCJPu1+ICMYkVOdfRUdPEi9m5v4F/IVVtE+8MZv0NXm6fJKcS2UkwMgDppIXLIKPS18hbSTwB3tLeq03+hLeAAAAAElFTkSuQmCC\"\n    },\n    \"ctrl+shift+s\": {\n      method: function(_arg) {\n        var editor, name;\n        editor = _arg.editor;\n        if (name = prompt(\"File name\", \"image\")) {\n          return editor.outputCanvas().toBlob(function(blob) {\n            return saveAs(blob, \"\" + name + \".png\");\n          });\n        }\n      },\n      icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACs0lEQVQ4T42SS0hUURjH/2fGO2MPTC3p6VQudBEt1Bm1UWgXCEW0LNpIlk5WYoq2UYseFAmaYaRNAy2KApMkq5lRepChjJqaiUJp4cKyRTgzPsZp7jl954xEK+teDt/HPff/+57MWuwpE2DbDQx5AFLIXwuIGMbAIOgLPUa6NNARgkPnmDVp+BwKLV3rbz7QymwO7x1nVV4h6P+0rWalEVwgHKHziyvxKrMBBMTcIsdcSBcT03P6PfeEf+zrTBWzOjrH71bmprX5gqg6lCTlOH2jD9eLMxHhQKzGYNIMWCKYf0EnKzA5swAjOC64BpYkYNZZmbvucW8AFQc3qJTPNvXjyokMaEaKbjJQ6kBgUcd8iINTdq6uH8jPjENZY4+QgPDtCrvW7gugJH+9AlQ7B3GpMB2rY43QqITFMBU+r1NGEgACzCB9hxl1D96DAF7eVG5nT6mE4/sSFYA0WGM2UnSGiE7RKfWFsK7Egl6X9zt2W0xoeDQIZjvpFY2ldjzrD+Db9BQ1izpOAC2GGkewCKUcoWYsD0QFiI9PxC6LGU2twwRweEV9aQ6e9/lVrVKl5qcUAqSnyASgSy4P+QYKkrqJoeXJSBRQdyoH7gG/ov8ZPoFkw6RQzl+lT1ZIh8ApSQyujo9RwFVHFrqGAtGtoUu5Q9LqEiCjy0zI51xXO0IeLIkC991jEuARl4uy8Go4iNoj25YhK5uKllEkJwg87BwHy6Ymni+04c1IALWHk9Hw7tiK6lK7E+XNH7AlXqDt5ScClHhFTYEV3aNB1BDAN/V6RYAteS/Kbg1hc5xA+1sCUAm8usDKesYkwPJfGZy5OYCNBOjonpCb6Jk8dzRjp5zh/uzoKv/ruejyqQa/6P3yk1mL3PXU11QwsYcJJNDw1Oio3Wpsf1sZJDpWIRh4UDDjyG82p2waquUVyAAAAABJRU5ErkJggg==\"\n    },\n    \"ctrl+e\": {\n      method: function(_arg) {\n        var blob, editor, paletteData;\n        editor = _arg.editor;\n        paletteData = Palette[\"export\"](editor.palette());\n        blob = new Blob([paletteData], {\n          type: \"text/plain\"\n        });\n        return saveAs(blob, \"palette.pal\");\n      },\n      icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC/UlEQVQ4T4WTW0gUYRTH/98s4+66umYGdjHSXLesyMi18qEg7EHKsB6kIunBHoJuFBj4YNBDBEFBUUmUQS1FpaRlCEEldiEybdcSzLVMLc3bquvsdcaZ+Tq70eXBapgzhxm+8/v+3/+cYfjPdbhobVZ6WsqBOckJBeCaNioFnnweGrtWVe/6EC1l/6o/sWdjWVZa6nH7Ult66nwOcCu8I2H09XqGOvqGTje0N1f9DSBcPFLsXLYoaeeKhUbD7EwNhhQPdMWEqa+l0ONEfOpq1eqaWnfOCDh3cHP1Bkf+3uVzfWCyGxoXIGYbEJzWUT3AYTaYsU0vRFPri0czAmorS4JbwsnxPCCBFcrgphTIYj4GfR14au1A3DRDiboJ7n7PF+Z5uLrdaF2+jDHhlx3vngligV+EHg4hWFyArs4WyWoxipibbT78LQkWTcHtWR64vcOTrLvBEbEVtRgZIzHkU/TRcGovVq1bjwRRx4RPQpurUY8XBBafU8IqxtJgUQO4P9sN99iIn3Xfy/XZil8mKcNV0BQDIFjR3PgWSkCBqEewMicXfp8XokGASYng9aAX6fPSkJpowKN3rjvMczdPsm1/khgZcILrHLo8gfBoL4Kj41BHh//a5TYp403N444dBMhVFm9tFCddlyCP9FCrQjAYkzCv6AwNCcPAx3aYtBDMogmqNg1ZsEB6Wo6K+mB6XdOHfua5mafYd7eQYwrtppMFnJT4oUqvoEd6IctBjA/5ACrmLIRk+zF4a0thP9QW6yDzXHfIWaXP4/TQe5pUH4WfCvsIpNMdIWaYcoC+R4OUZJxHz9WtvwHdlx2RzLImo+ZvBlenaBGFSjtylYJmQAv+gKpSLFvsTvRcKfoDcMERtu17bJqefBArjEUM8hPmp/doMYFIkWXJLfTe2B+hI5hjR+g6u/rb4rKaeGWiJZG0C5xHZVNQ5ppMWSFbKEc94hqMC3bxfudRaUm5a1YM0Hky+wgThDWMs01gPPGff3d00BgUarczu7LzUHTtd5jOkNp6KQ05AAAAAElFTkSuQmCC\"\n    },\n    \"ctrl+l\": {\n      method: function(_arg) {\n        var editor;\n        editor = _arg.editor;\n        return editor.execute(editor.Command.NewLayer());\n      },\n      icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB60lEQVQ4T2NkgAAZIBYHYmYoHxf1CijxCIj/wRQwQhnGP3782MvMzMzLyMjIhE33nz9/GGbNmjUpLy+vH9kQmAFmv3//Pv7z508moAFw/SBN//79Y/j16xeDsLAww+vXrxnWrl07KScnB24ISDUImwIVnwQawsDExATWBAIgA/7+/Qs2QEhICEyD5BYvXjwpMzMTZMgDFANAimEApPD///9gQ4AuYxAUFETxGQsLizlQ4DSKASANMC+A2CADQRhkCMh1IENBbDExMQasBqAHHrIhMMNAhvDz8xNnAMhAmCEgjSBDQHwuLi7iDQAZAgsPWBixsbGRZgDI1l1n1zPsv7CV4ePX9wy///xmuH39zsyjC25nogQichiANMHA1hMrGS4838NgrGXCICukyrDvygaGE1cOM9y/86aXoAEgg9In+DP4e7oBEzoTg79mHkPPnlRgmmdiWLFu0w+cBsACEEQH1JsyZEVlM3hpp8BdtenyVIbWGS3gVAhLiSegbIys4FSiyuDj6cAATNgMlW4LGNp3JjBwMLPDXQDSYAJMbQeBmYkDyMbITDO3dDLsvb2IwUrPhkFV0pDh9vPzDMcuHWF4fP8jOAxAQBaIQdkZa04EKdCJFM7m4GcNAWYVLmCS+Pbn+5+FFxa+yQIAB8Ulv4JKPAEAAAAASUVORK5CYII=\"\n    },\n    \"ctrl+r\": {\n      method: function(_arg) {\n        var editor, height, newSize, width, _ref1, _ref2;\n        editor = _arg.editor;\n        _ref1 = editor.pixelExtent(), width = _ref1.width, height = _ref1.height;\n        if (newSize = prompt(\"New Size (WxH)\", \"\" + width + \"x\" + height)) {\n          _ref2 = newSize.split(\"x\").map(function(v) {\n            return parseInt(v, 10);\n          }), width = _ref2[0], height = _ref2[1];\n          return editor.execute(editor.Command.Resize({\n            width: width,\n            height: height\n          }));\n        }\n      },\n      icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACLElEQVQ4T91Tz2sTQRR+05hmTTeB0iS7h8ZjLyEKgoVehCLWFG0g0ahrMEpp6rH++EMUFH8UUbRIq7ZZ21qoh14UjfQiQkXpQWKSJmlcyzZmY3fj7DhjGklK+g/4YBjmzX7fvve9+dC15CUCNIhJgBC66H7j8H3EcjsjvhAlJr03TRNMXNsRIzjU2UcPGJaV5K5gRibNSoKjzVrwu/cDQgiSqXeArr4dJQc7e6FS1UDRFchpWflW/8Pwzr8zsI2QVS/vdXIWDuxWHpYz7wFdeRMnFmQFgRNBtImQKqcg/zMr3x543ERyQT6reB3dXZ4OAVIb3yC3uVZrYez1CNEMTeQQt9rN73Pqhg758tqru4MTgcYqzk9H5oUO8YSJTciVcvLUOTl86tEQ+SfWCC3Rutf6iYqUvBeYGGolojQVXqQiVxi4ft9S7Vbg3XL/G0FsJpLA2LQ/OT3TNIF6/8HxwXmCcV9Fx76ly0vrLI+G5yTyIDiJGNjFeUJstvlS/uXT6IumSQTHA4tu3nPMgiyQVjKlKiY9FiAFdFE+8/d9uzg3CHYRiloR0hvpH89js65G5Y/fGUi4HZ6Q6KTfbBZhXS2AXjUAxaYjxNflB/WXCjrWIatmSltbWs9cvFZiYwRuHknQKkLt7XuAtzlhJbUCKPrsJPG7DoDx24Av3z9DuaKKrcB1oqPX+4nP64M2aqYPXz8CkibDtAVmT7q2rSoPL7R8HwzM7G5u257Z/w969A/vqEbP0wAAAABJRU5ErkJggg==\"\n    },\n    \"ctrl+b\": {\n      method: function(_arg) {\n        var editor, images, name;\n        editor = _arg.editor;\n        try {\n          images = JSON.parse(localStorage.images);\n        } catch (_error) {\n          images = {};\n        }\n        if (name = prompt(\"Store image in local storage\", \"image_name\")) {\n          images[name] = editor.outputCanvas().toDataURL(\"image/png\");\n          return localStorage.images = JSON.stringify(images);\n        }\n      },\n      icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC0ElEQVQ4T6WSaUhUURTH/29cMlzGbUbScZkKTNDUPqjlAhEkmZCZJYgVSvnBDxGlpEJGJBIpBhUarS6VSQVK0IKDC+rkEqiYjpNbYqONjtu4zDi+92533lTalyg6cPnfc+49v3vuuZfBfxpjzq9sms8nhJzlQGQ8z4PjAdasdMLxBCzVjcGBY2mM57qun/IPEwDljXMzSRGO7v9STH718FpJeoCdAHjYoCPJe8WoHS2nZJaexmKd6jq3blGWKo39XMvdV4i8KjVuZQQyAuCeYoakRDrD3s76r4pYMbLIfjyAssxgC6DsvZacjHFFXdfcHwGuphbIv72AlUMQVnTNYFa/nhYAt99MkbT97gIgJVqKmlYtkqM8fsFetmsR59sOvUqJrZJoiOV7sDCmxOC7+1oBUPJaQ84ckOBt9zxE5oCIAQMChjpm38mgQIhkCA5OoZgbVkPsvgO2jlKoGiqMAqCodoJkHPSAom8BiWES1HbOIIGq2Yy01FWtAs7bY7E29RyGWQbTg6vQr1L0yqS/ACh8NU4yY7ehWbUAS1cs5mBoQ4hzB8Q7j8CoKYPIlr7Isi90HQMonkpFad5xy/arNWPkXJwnPgwt4lCoBPW9OgTZttETlJAGHqXJpRDZsDAtyTHb1gtT+BUUKnhUZkVYAJerR8iFeBk6R/T07gA/WQ9vUTd2xcTDpK0AY2WCcVGG6ZYejO4uhp+PDNeq+/H0UqQFkFulJtkJfuge00Omrwe72AeWkcLNrQ0uUlua7I2Fj2p4J92BjdgL6olFFNb0ozL7ByCrXEVyE+XCv2+8exgnMh9BXX0Rmi9KbPEJBr/MQxJ7A4yz36/+FDz7xD/JibISKjj/oL+VY7kQE0fsPXtSkZOeQd+PQ099LYbHJ9AoK8CsyGuju3Q2rzfUNRXFJmzquWU9KcrFECqXWocH+IG3MSmXJjVpx25+Hv0te5PzHS7ETRuBCPcLAAAAAElFTkSuQmCC\"\n    },\n    \"+\": {\n      method: function(_arg) {\n        var currentSize, editor;\n        editor = _arg.editor;\n        currentSize = editor.pixelSize();\n        if (currentSize < 32) {\n          return editor.pixelSize(currentSize * 2);\n        }\n      },\n      icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACbklEQVQ4T6WTbWhSURjH/15fptPltJm2pJkGLRdUNAZBY/TycZ8EI6LojWAUYxBBtL74KSKCYDSEiCihDBcEvdArgy2C1WRbc6GN3jaXIpMcvl7vvefa8YarMT8IXe45l8u9z+/8zvM8R4b/vGSVeI/Hw3Qe6R8UiNhNiNhMn+AFISYIwtPwsxtn6Xex2loSQAo+3D/cqC51GeplUDAlgN6sUMJ8ksVcIj8SHb25rxpEArye5bwGtdhj1jHIFAlYvgRCAUoGaKiTY2C6Dzk2Da7Asz73kOZfEwnwPJyPbmmSW1lBRJ4rQSzRQYWpAOoUMng/nsQBy1Y8CgcxdOzJ8rbLsdLL41CWbG9WMotZAiKWATSYToFv55HJpWBW6mBf04TJhR/4Go+jyHKp0UtjxmXAw4klsmujhklkBAoA1f9jcHv6BDrNDroljo4izUkRBa6IN+MhfLg8JS0uTffHktGdLVprjurnOFEyKJvcm+zFr3QcRpUGVqMen+YWMP9zEcUCx4YGIlIuJMCdkbh3nV7V47BokcoTZMsQalCnlMGgkaP37l7scGzA2+AsJq6FVuegXEZTx/Fhy1p1l83SAJWCQbnoBVZA6EsSvndHkcmmoOaJeE6jcx68GvxcqcSKRtJsOzTI8aSbF2gj8QScQOImdobbrw9tsjo7EIuMIxJ8lSxw6T2nvN8lyAqdap0WcLeplPZGv6ml1WVz7kY08h4zwRfJ07eippoAUqdSyGaz6Dfb2lz21na8DFzHGV/ibxVqOU8eN1QW7Xq/QqV25TJLV/r8qYs1G1QWcLshb5fXmy88yMdWJbEWi2r//AZSUiAguj/HUQAAAABJRU5ErkJggg==\"\n    },\n    \"-\": {\n      method: function(_arg) {\n        var currentSize, editor;\n        editor = _arg.editor;\n        currentSize = editor.pixelSize();\n        if (currentSize > 1) {\n          return editor.pixelSize(currentSize / 2);\n        }\n      },\n      icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVElEQVQ4T6WTS2gTURSG/0zejaVNbUws0aZVamgFFUtUiBQUF2JXgYiIC0GEqovufBTELNWFblpSxIUPMFK6EsVaMVBXPoIuUkwqbUXHJA0GE5vMdDKZO+OdkaQqkQYc5twLdzjf+bjnjA7/+eiq+aFQiNl/YmRMIvIgIXIH3VGRpLQkSY8TT0bP0e9yvVoaQEs+PhJttSgD9iYdDIwC0FeQFHzJCfic5WfYl7cO1INogOcfxbDdIg851zEolgmEigJCAUYGaDbrkUgVsZAujg8f6Trzt4UGeJrg2W3tercgyeBFBbJCgwpTAZgNOhh1CqZjqa/nAz2b6gIexUtkR4eR+VYiILIKoMl08d2/Bn0+D7nEgfwo0VgGKahRyrfNx9tUmGYw+a5Adm+2MtmiRAGg+r8M/KMXwe/1QhbpOQ1ZEEHKFRhu3EV7ZlHL1ZYHr3Lsrk6bm6P6nChrBqrJnvErMLDsamVqodkIZcGZT1lrgDszmfCGFtPQFpcNeZ6gpEKogdmog92qx5sPS+DmXgg9hcmdhy9Pzf1+D7U2Onwno671lgGPqxkmAwO16SuChPh8Dtz3JRwyRbH4fjq3InL+o9djNcgfg2TdfmxMrJDBikQHqUIgSiTjEGbFgy3xLnevD+nkWyRjKmTZfyr8SYPUAP+a6Ilgn8nY3RpxdHoDnt59YJOvMRubyp2+zToaAmiTSiFbnXLE6ekLdHv78WziJs7ey652oZH/KRSEyWXbGDGYLAGuWLg6HMlfatigWiAYhL5f3+S88JBPV8/WvIO17H4CfCMpIEZZGWYAAAAASUVORK5CYII=\"\n    },\n    \";\": {\n      method: function(_arg) {\n        var blob, editor;\n        editor = _arg.editor;\n        blob = new Blob([localStorage.images], {\n          type: \"text/plain\"\n        });\n        return saveAs(blob, \"images.json\");\n      }\n    },\n    \"?\": {\n      method: function(_arg) {\n        var editor;\n        editor = _arg.editor;\n        return window.open(\"./docs\");\n      },\n      icon: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC7klEQVQ4T6WTW0hUQRjH/+7q6mpkbLK663ZX28pExDJLKRRKKypZiNouVoTggy+RDxEoCSEp0UNJPkSloYTdoxtYdNE2a7vRmou4mWjppuUF3T3n7Dkz03Rku9JDNPMwM8z8f3zf9/8mBP85Qn7X3+sS52kJszOGnZSxOEoJCGNeSli9pIiNBemx737W/AJodvttYPT4nOlhphDGhYSobzUaDQJ8+/aDb0AmSol9hflSEPIdcKd93MYIrbOadFFjEwI6en3o/eIDoQzGaB2SLVNhmBaBxx2jPkUhhUV5s1WICrjhHJ1LNLQl2RJh9o740ewagik6DGvTzGB8Oj0jeNE9jJXWGFhiotD86lO/oIjZB2wp3SqgqW2obGG8/pAkybjq7IckyijfuijI5ytD9ZUOBBSKvLR48Prg4Zv+8jJ7aoUKqL//sSsjaWpC69vPcH8c5WFT7NtgxeueEURFaLEsMQZtXYO42NqNJMt05CyOQ8Pdbs+RvemJKuDk7R5/bopBf+7Be4wLMmQi81oSrFsyE5nzjQjIFHde9uGJ2wt9uBZFecmoudYu1JRkRaqAo5c7/euXmvRnOWBsYpyLeeY8zKrdGRiZkFDd9BJiQOGJAHqdBsUbU1F1/pVQV5ozCahocHUVZFkSHroG4e4b5vbJoDwN7orqFpEVXgZ+5jNhRgzWLJ2FIw0vPBfK8ydTKD31rCw31XxoSqQOFx+9g08QVGHlnkzwZsL+2gfqORQUW1anYGhYQOM9d/nNyk2TRSw+1jIXGtaya43VPOqTcM3hgSAGkJZgVIXOzgFoqIz8zAUwGiJx+NzTfpGI2a3Htk3a+G1sr2y2UUbrijemRMk8dIfrA3q9w6DcuvjYaCxPtiA0VIuKMw6fTEih44T9RyMFIZsOXrcpjB3fvCrJZJ1tQLhOq14JogKXZwinb70ZkCkteV67489WDkJySs7PI9oQ9TMRhcZ9qwGhxMt7o16SWGN73a6/f6Yg5F/WrzeMbiDawgJJAAAAAElFTkSuQmCC\"\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=actions.coffee",
      "type": "blob"
    },
    "command": {
      "path": "command",
      "content": "(function() {\n  module.exports = function(I, self) {\n    var C;\n    if (I == null) {\n      I = {};\n    }\n    self.Command = {};\n    C = function(name, constructor) {\n      return self.Command[name] = function(data) {\n        var command;\n        if (data == null) {\n          data = {};\n        }\n        data = Object.extend({}, data);\n        data.name = name;\n        command = constructor(data);\n        if (command.toJSON == null) {\n          command.toJSON = function() {\n            return data;\n          };\n        }\n        return command;\n      };\n    };\n    C(\"ChangePalette\", function(data) {\n      if (data.previous == null) {\n        data.previous = self.palette();\n      }\n      return {\n        execute: function() {\n          return self.palette(data.palette);\n        },\n        undo: function() {\n          return self.palette(data.previous);\n        }\n      };\n    });\n    C(\"ChangePixel\", function(data) {\n      if (data.previous == null) {\n        data.previous = self.getPixel(data).index;\n      }\n      return {\n        execute: function() {\n          return self.changePixel(data);\n        },\n        undo: function() {\n          return self.changePixel(Object.extend({}, data, {\n            index: data.previous\n          }));\n        }\n      };\n    });\n    C(\"Resize\", function(data) {\n      var height, state, width;\n      width = data.width, height = data.height, state = data.state;\n      if (data.previous == null) {\n        data.previous = self.pixelExtent();\n      }\n      if (state == null) {\n        state = self.layerState();\n      }\n      return {\n        execute: function() {\n          return self.resize(data);\n        },\n        undo: function() {\n          return self.restoreLayerState(state);\n        }\n      };\n    });\n    C(\"NewLayer\", function(data) {\n      return {\n        execute: function() {\n          console.log(data);\n          return self.newLayer(data);\n        },\n        undo: function() {\n          return self.removeLayer();\n        }\n      };\n    });\n    C(\"Composite\", function(data) {\n      var commands;\n      if (data.commands) {\n        data.commands = data.commands.map(self.Command.parse);\n      } else {\n        data.commands = [];\n      }\n      commands = data.commands;\n      return {\n        execute: function() {\n          return commands.invoke(\"execute\");\n        },\n        undo: function() {\n          return commands.copy().reverse().invoke(\"undo\");\n        },\n        push: function(command, noExecute) {\n          commands.push(command);\n          if (!noExecute) {\n            return command.execute();\n          }\n        },\n        toJSON: function() {\n          return Object.extend({}, data, {\n            commands: commands.invoke(\"toJSON\")\n          });\n        }\n      };\n    });\n    return self.Command.parse = function(commandData) {\n      return self.Command[commandData.name](commandData);\n    };\n  };\n\n}).call(this);\n\n//# sourceURL=command.coffee",
      "type": "blob"
    },
    "drop": {
      "path": "drop",
      "content": "(function() {\n  var Drop, Loader, loader, logError;\n\n  Loader = require(\"./loader\");\n\n  loader = Loader();\n\n  Drop = function(I, self) {\n    var callback;\n    if (I == null) {\n      I = {};\n    }\n    if (self == null) {\n      self = Core(I);\n    }\n    callback = function(_arg) {\n      var dataURL;\n      dataURL = _arg.dataURL;\n      return loader.load(dataURL).then(function(imageData) {\n        return self.handlePaste(loader.fromImageDataWithPalette(imageData, self.palette()));\n      });\n    };\n    $(\"html\").dropImageReader(callback);\n    return $(document).pasteImageReader(callback);\n  };\n\n  module.exports = Drop;\n\n  logError = function(message) {\n    return console.error(message);\n  };\n\n}).call(this);\n\n//# sourceURL=drop.coffee",
      "type": "blob"
    },
    "editor": {
      "path": "editor",
      "content": "(function() {\n  var Actions, Command, Drop, Editor, GridGen, Hotkeys, Layer, Palette, Size, Tools, TouchCanvas, Undo, debugTemplate, runtime, saveAs, template;\n\n  global.PACKAGE = PACKAGE;\n\n  global.require = require;\n\n  require(\"appcache\");\n\n  require(\"jquery-utils\");\n\n  require(\"./lib/canvas-to-blob\");\n\n  saveAs = require(\"./lib/file_saver\");\n\n  runtime = require(\"runtime\")(PACKAGE);\n\n  runtime.boot();\n\n  runtime.applyStyleSheet(require('./style'));\n\n  TouchCanvas = require(\"touch-canvas\");\n\n  GridGen = require(\"grid-gen\");\n\n  Drop = require(\"./drop\");\n\n  Command = require(\"./command\");\n\n  Undo = require(\"./undo\");\n\n  Hotkeys = require(\"./hotkeys\");\n\n  Tools = require(\"./tools\");\n\n  Actions = require(\"./actions\");\n\n  Layer = require(\"./layer\");\n\n  Palette = require(\"./palette\");\n\n  template = require(\"./templates/editor\");\n\n  debugTemplate = require(\"./templates/debug\");\n\n  Size = require(\"./util\").Size;\n\n  Editor = function(I, self) {\n    var activeIndex, activeTool, canvas, canvasPosition, canvasSize, drawPixel, lastCommand, makeLayer, pixelExtent, pixelSize, previewCanvas, thumbnailCanvas, updateActiveColor, updateActiveLayer, updateCanvasSize, updatePixelExtent, updateViewportCentering;\n    if (I == null) {\n      I = {};\n    }\n    activeIndex = Observable(1);\n    pixelExtent = Observable(Size(32, 32));\n    pixelSize = Observable(8);\n    canvasSize = Observable(function() {\n      return pixelExtent().scale(pixelSize());\n    });\n    canvas = null;\n    lastCommand = null;\n    if (self == null) {\n      self = Model(I);\n    }\n    self.include(Command);\n    self.include(Undo);\n    self.include(Hotkeys);\n    self.include(Tools);\n    self.include(Actions);\n    self.include(Drop);\n    activeTool = self.activeTool;\n    updateActiveLayer = function() {\n      if (self.layers.indexOf(self.activeLayer()) === -1) {\n        return self.activeLayer(self.layers().last());\n      }\n    };\n    drawPixel = function(canvas, x, y, color, size) {\n      if (canvas === previewCanvas && color === \"transparent\") {\n        color = \"white\";\n      }\n      if (color === \"transparent\") {\n        return canvas.clear({\n          x: x * size,\n          y: y * size,\n          width: size,\n          height: size\n        });\n      } else {\n        return canvas.drawRect({\n          x: x * size,\n          y: y * size,\n          width: size,\n          height: size,\n          color: color\n        });\n      }\n    };\n    self.extend({\n      activeIndex: activeIndex,\n      activeLayer: Observable(),\n      activeLayerIndex: function() {\n        return self.layers.indexOf(self.activeLayer());\n      },\n      backgroundIndex: Observable(0),\n      pixelSize: pixelSize,\n      pixelExtent: pixelExtent,\n      handlePaste: function(data) {\n        var command;\n        command = self.Command.Composite();\n        self.execute(command);\n        if (data.width > pixelExtent().width || data.height > pixelExtent().height) {\n          command.push(self.Command.Resize(pixelExtent().max(data)));\n        }\n        return command.push(self.Command.NewLayer(data));\n      },\n      newLayer: function(data) {\n        makeLayer(data != null ? data.data : void 0);\n        return self.repaint();\n      },\n      removeLayer: function() {\n        self.layers.pop();\n        updateActiveLayer();\n        return self.repaint();\n      },\n      outputCanvas: function() {\n        var outputCanvas;\n        outputCanvas = TouchCanvas(pixelExtent());\n        self.layers.forEach(function(layer) {\n          return layer.each(function(index, x, y) {\n            return outputCanvas.drawRect({\n              x: x,\n              y: y,\n              width: 1,\n              height: 1,\n              color: self.palette()[index]\n            });\n          });\n        });\n        return outputCanvas.element();\n      },\n      resize: function(size) {\n        return pixelExtent(Size(size));\n      },\n      repaint: function() {\n        self.layers().first().each(function(_, x, y) {\n          return self.repaintPixel({\n            x: x,\n            y: y\n          });\n        });\n        return self;\n      },\n      restoreState: function(state) {\n        self.palette(state.palette);\n        self.restoreLayerState(state.layers);\n        self.activeLayer(self.layers()[state.activeLayerIndex]);\n        return self.history(state.history);\n      },\n      saveState: function() {\n        return {\n          palette: self.palette(),\n          layers: self.layerState(),\n          activeLayerIndex: self.activeLayerIndex(),\n          history: self.history().invoke(\"toJSON\")\n        };\n      },\n      layerState: function() {\n        return self.layers().invoke(\"toJSON\");\n      },\n      restoreLayerState: function(layerData) {\n        var index;\n        self.pixelExtent(Size(layerData.first()));\n        index = self.activeLayerIndex();\n        self.layers([]);\n        layerData.forEach(function(layerData) {\n          return makeLayer(layerData.data);\n        });\n        self.activeLayer(self.layer(index));\n        return self.repaint();\n      },\n      draw: function(_arg) {\n        var x, y;\n        x = _arg.x, y = _arg.y;\n        return lastCommand.push(self.Command.ChangePixel({\n          x: x,\n          y: y,\n          index: activeIndex(),\n          layer: self.activeLayerIndex()\n        }));\n      },\n      changePixel: function(params) {\n        var index, layer, x, y;\n        x = params.x, y = params.y, index = params.index, layer = params.layer;\n        if (canvas !== previewCanvas) {\n          self.layer(layer).set(x, y, index);\n        }\n        return self.repaintPixel(params);\n      },\n      layers: Observable([]),\n      layer: function(index) {\n        if (index != null) {\n          return self.layers()[index];\n        } else {\n          return self.activeLayer();\n        }\n      },\n      repaintPixel: function(_arg) {\n        var color, colorIndex, index, layerIndex, x, y;\n        x = _arg.x, y = _arg.y, colorIndex = _arg.index, layerIndex = _arg.layer;\n        if (canvas === previewCanvas) {\n          index = self.layers.map(function(layer, i) {\n            if (i === layerIndex) {\n              if (colorIndex === 0) {\n                return self.layers.map(function(layer, i) {\n                  return layer.get(x, y);\n                }).filter(function(index, i) {\n                  return (index !== 0) && !self.layers()[i].hidden() && (i < layerIndex);\n                }).last() || self.backgroundIndex();\n              } else {\n                return colorIndex;\n              }\n            } else {\n              return layer.get(x, y);\n            }\n          }).filter(function(index, i) {\n            return (index !== 0) && !self.layers()[i].hidden();\n          }).last() || self.backgroundIndex();\n        } else {\n          index = self.layers.map(function(layer) {\n            return layer.get(x, y);\n          }).filter(function(index, i) {\n            return (index !== 0) && !self.layers()[i].hidden();\n          }).last() || self.backgroundIndex();\n        }\n        color = self.palette()[index];\n        drawPixel(canvas, x, y, color, pixelSize());\n        if (canvas !== previewCanvas) {\n          return drawPixel(thumbnailCanvas, x, y, color, 1);\n        }\n      },\n      getPixel: function(_arg) {\n        var layer, x, y;\n        x = _arg.x, y = _arg.y, layer = _arg.layer;\n        return {\n          x: x,\n          y: y,\n          index: self.layer(layer).get(x, y),\n          layer: layer != null ? layer : self.activeLayerIndex()\n        };\n      },\n      palette: Observable([\"transparent\"].concat(Palette.dawnBringer32)),\n      preview: function(fn) {\n        var realCanvas, realCommand;\n        realCommand = lastCommand;\n        lastCommand = self.Command.Composite();\n        realCanvas = canvas;\n        canvas = previewCanvas;\n        canvas.clear();\n        fn();\n        canvas = realCanvas;\n        return lastCommand = realCommand;\n      }\n    });\n    makeLayer = function(data) {\n      var layer;\n      layer = Layer({\n        width: pixelExtent().width,\n        height: pixelExtent().height,\n        data: data,\n        palette: self.palette\n      });\n      layer.hidden.observe(self.repaint);\n      self.layers.push(layer);\n      return self.activeLayer(layer);\n    };\n    makeLayer();\n    $('body').append(template(self));\n    canvas = TouchCanvas(canvasSize());\n    previewCanvas = TouchCanvas(canvasSize());\n    thumbnailCanvas = TouchCanvas(pixelExtent());\n    updateActiveColor = function(newIndex) {\n      var color;\n      color = self.palette()[newIndex];\n      return $(\".palette .current\").css({\n        backgroundColor: color\n      });\n    };\n    updateActiveColor(activeIndex());\n    activeIndex.observe(updateActiveColor);\n    $(\".viewport\").append(canvas.element()).append($(previewCanvas.element()).addClass(\"preview\"));\n    $(\".thumbnail\").append(thumbnailCanvas.element());\n    updateViewportCentering = (function() {\n      var size;\n      size = canvasSize();\n      return $(\".viewport\").toggleClass(\"vertical-center\", size.height < $(\".main\").height());\n    }).debounce(15);\n    $(window).resize(updateViewportCentering);\n    updateCanvasSize = function(size) {\n      var gridImage;\n      gridImage = GridGen().backgroundImage();\n      [canvas, previewCanvas].forEach(function(canvas) {\n        var element;\n        element = canvas.element();\n        element.width = size.width;\n        element.height = size.height;\n        return canvas.clear();\n      });\n      $(\".viewport, .overlay\").css({\n        width: size.width,\n        height: size.height\n      });\n      $(\".overlay\").css({\n        backgroundImage: gridImage\n      });\n      return self.repaint();\n    };\n    updateCanvasSize(canvasSize());\n    canvasSize.observe(updateCanvasSize);\n    updatePixelExtent = function(size) {\n      var element;\n      self.layers.forEach(function(layer) {\n        return layer.resize(size);\n      });\n      element = thumbnailCanvas.element();\n      element.width = size.width;\n      element.height = size.height;\n      thumbnailCanvas.clear();\n      return self.repaint();\n    };\n    pixelExtent.observe(updatePixelExtent);\n    self.palette.observe(function() {\n      return self.repaint();\n    });\n    canvasPosition = function(position) {\n      return position.scale(pixelExtent()).floor();\n    };\n    previewCanvas.on(\"touch\", function(position) {\n      lastCommand = self.Command.Composite();\n      self.execute(lastCommand);\n      return activeTool().touch({\n        position: canvasPosition(position),\n        editor: self\n      });\n    });\n    previewCanvas.on(\"move\", function(position) {\n      return activeTool().move({\n        position: canvasPosition(position),\n        editor: self\n      });\n    });\n    previewCanvas.on(\"release\", function(position) {\n      activeTool().release({\n        position: canvasPosition(position),\n        editor: self\n      });\n      return previewCanvas.clear();\n    });\n    return self;\n  };\n\n  global.editor = Editor();\n\n}).call(this);\n\n//# sourceURL=editor.coffee",
      "type": "blob"
    },
    "file_reading": {
      "path": "file_reading",
      "content": "(function() {\n  var detectType;\n\n  detectType = function(file) {\n    if (file.type.match(/^image\\//)) {\n      return \"image\";\n    }\n    if (file.name.match(/\\.json$/)) {\n      return \"json\";\n    }\n    return \"text\";\n  };\n\n  module.exports = {\n    readerInput: function(_arg) {\n      var chose, encoding, image, input, json, text;\n      chose = _arg.chose, encoding = _arg.encoding, image = _arg.image, json = _arg.json, text = _arg.text;\n      if (encoding == null) {\n        encoding = \"UTF-8\";\n      }\n      input = document.createElement('input');\n      input.type = \"file\";\n      input.onchange = function() {\n        var file, reader;\n        reader = new FileReader();\n        file = input.files[0];\n        switch (detectType(file)) {\n          case \"image\":\n            reader.onload = function(evt) {\n              return typeof image === \"function\" ? image(evt.target.result) : void 0;\n            };\n            reader.readAsDataURL(file);\n            break;\n          case \"json\":\n            reader.onload = function(evt) {\n              return typeof json === \"function\" ? json(JSON.parse(evt.target.result)) : void 0;\n            };\n            reader.readAsText(file, encoding);\n            break;\n          case \"text\":\n            reader.onload = function(evt) {\n              return typeof text === \"function\" ? text(evt.target.result) : void 0;\n            };\n            reader.readAsText(file, encoding);\n        }\n        return chose(file);\n      };\n      return input;\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=file_reading.coffee",
      "type": "blob"
    },
    "hotkeys": {
      "path": "hotkeys",
      "content": "(function() {\n  module.exports = function(I, self) {\n    if (I == null) {\n      I = {};\n    }\n    self.extend({\n      addHotkey: function(key, method) {\n        return $(document).bind(\"keydown\", key, function(event) {\n          if (typeof method === \"function\") {\n            method({\n              editor: self\n            });\n          } else {\n            self[method]();\n          }\n          return event.preventDefault();\n        });\n      }\n    });\n    return self;\n  };\n\n}).call(this);\n\n//# sourceURL=hotkeys.coffee",
      "type": "blob"
    },
    "layer": {
      "path": "layer",
      "content": "(function() {\n  var Grid, Layer, TouchCanvas, previewCanvas;\n\n  TouchCanvas = require(\"touch-canvas\");\n\n  Grid = require(\"./util\").Grid;\n\n  Layer = function(I, self) {\n    var data, grid, height, paint, palette, pixelSize, previewCanvas, width;\n    if (I == null) {\n      I = {};\n    }\n    if (self == null) {\n      self = Core(I);\n    }\n    width = I.width, height = I.height, palette = I.palette, data = I.data;\n    pixelSize = 1;\n    grid = Grid(width, height, function(x, y) {\n      if (data) {\n        return data[x + y * width];\n      } else {\n        return 0;\n      }\n    });\n    previewCanvas = TouchCanvas({\n      width: width,\n      height: height\n    });\n    self.extend({\n      previewCanvas: previewCanvas.element(),\n      each: grid.each,\n      get: grid.get,\n      hidden: Observable(false),\n      set: function(x, y, index) {\n        paint(x, y, index);\n        return grid.set(x, y, index);\n      },\n      repaint: function() {\n        return grid.each(function(index, x, y) {\n          return paint(x, y, index);\n        });\n      },\n      resize: function(size) {\n        var element, newHeight, newWidth;\n        newWidth = size.width, newHeight = size.height;\n        if (newHeight > height) {\n          grid.expand(0, newHeight - height, 0);\n        } else if (newHeight < height) {\n          grid.contract(0, height - newHeight);\n        }\n        height = newHeight;\n        if (newWidth > width) {\n          grid.expand(newHeight - width, 0, 0);\n        } else if (newWidth < width) {\n          grid.contract(width - newWidth, 0);\n        }\n        width = newWidth;\n        element = previewCanvas.element();\n        element.width = width;\n        element.height = height;\n        return self.repaint();\n      },\n      toJSON: function() {\n        return {\n          width: width,\n          height: height,\n          data: grid.toArray()\n        };\n      }\n    });\n    paint = function(x, y, index) {\n      var color;\n      color = palette()[index];\n      if (color === \"transparent\") {\n        return previewCanvas.clear({\n          x: x * pixelSize,\n          y: y * pixelSize,\n          width: pixelSize,\n          height: pixelSize\n        });\n      } else {\n        return previewCanvas.drawRect({\n          x: x * pixelSize,\n          y: y * pixelSize,\n          width: pixelSize,\n          height: pixelSize,\n          color: color\n        });\n      }\n    };\n    if (data) {\n      self.repaint();\n    }\n    return self;\n  };\n\n  module.exports = Layer;\n\n  previewCanvas = function(width, height) {\n    var canvas;\n    return canvas = document.createElement(\"canvas\");\n  };\n\n}).call(this);\n\n//# sourceURL=layer.coffee",
      "type": "blob"
    },
    "lib/canvas-to-blob": {
      "path": "lib/canvas-to-blob",
      "content": "/* canvas-toBlob.js\n * A canvas.toBlob() implementation.\n * 2011-07-13\n * \n * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr\n * License: X11/MIT\n *   See LICENSE.md\n */\n\n/*global self */\n/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,\n  plusplus: true */\n\n/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */\n\n(function(view) {\n\"use strict\";\nvar\n    Uint8Array = view.Uint8Array\n\t, HTMLCanvasElement = view.HTMLCanvasElement\n\t, is_base64_regex = /\\s*;\\s*base64\\s*(?:;|$)/i\n\t, base64_ranks\n\t, decode_base64 = function(base64) {\n\t\tvar\n\t\t\t  len = base64.length\n\t\t\t, buffer = new Uint8Array(len / 4 * 3 | 0)\n\t\t\t, i = 0\n\t\t\t, outptr = 0\n\t\t\t, last = [0, 0]\n\t\t\t, state = 0\n\t\t\t, save = 0\n\t\t\t, rank\n\t\t\t, code\n\t\t\t, undef\n\t\t;\n\t\twhile (len--) {\n\t\t\tcode = base64.charCodeAt(i++);\n\t\t\trank = base64_ranks[code-43];\n\t\t\tif (rank !== 255 && rank !== undef) {\n\t\t\t\tlast[1] = last[0];\n\t\t\t\tlast[0] = code;\n\t\t\t\tsave = (save << 6) | rank;\n\t\t\t\tstate++;\n\t\t\t\tif (state === 4) {\n\t\t\t\t\tbuffer[outptr++] = save >>> 16;\n\t\t\t\t\tif (last[1] !== 61 /* padding character */) {\n\t\t\t\t\t\tbuffer[outptr++] = save >>> 8;\n\t\t\t\t\t}\n\t\t\t\t\tif (last[0] !== 61 /* padding character */) {\n\t\t\t\t\t\tbuffer[outptr++] = save;\n\t\t\t\t\t}\n\t\t\t\t\tstate = 0;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t// 2/3 chance there's going to be some null bytes at the end, but that\n\t\t// doesn't really matter with most image formats.\n\t\t// If it somehow matters for you, truncate the buffer up outptr.\n\t\treturn buffer;\n\t}\n;\nif (Uint8Array) {\n\tbase64_ranks = new Uint8Array([\n\t\t  62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1\n\t\t, -1, -1,  0, -1, -1, -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9\n\t\t, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25\n\t\t, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35\n\t\t, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51\n\t]);\n}\nif (HTMLCanvasElement && !HTMLCanvasElement.prototype.toBlob) {\n\tHTMLCanvasElement.prototype.toBlob = function(callback, type /*, ...args*/) {\n\t\t  if (!type) {\n\t\t\ttype = \"image/png\";\n\t\t} if (this.mozGetAsFile) {\n\t\t\tcallback(this.mozGetAsFile(\"canvas\", type));\n\t\t\treturn;\n\t\t}\n\t\tvar\n\t\t\t  args = Array.prototype.slice.call(arguments, 1)\n\t\t\t, dataURI = this.toDataURL.apply(this, args)\n\t\t\t, header_end = dataURI.indexOf(\",\")\n\t\t\t, data = dataURI.substring(header_end + 1)\n\t\t\t, is_base64 = is_base64_regex.test(dataURI.substring(0, header_end))\n\t\t\t, blob\n\t\t;\n\t\tif (Blob.fake) {\n\t\t\t// no reason to decode a data: URI that's just going to become a data URI again\n\t\t\tblob = new Blob\n\t\t\tif (is_base64) {\n\t\t\t\tblob.encoding = \"base64\";\n\t\t\t} else {\n\t\t\t\tblob.encoding = \"URI\";\n\t\t\t}\n\t\t\tblob.data = data;\n\t\t\tblob.size = data.length;\n\t\t} else if (Uint8Array) {\n\t\t\tif (is_base64) {\n\t\t\t\tblob = new Blob([decode_base64(data)], {type: type});\n\t\t\t} else {\n\t\t\t\tblob = new Blob([decodeURIComponent(data)], {type: type});\n\t\t\t}\n\t\t}\n\t\tcallback(blob);\n\t};\n}\n}(self));\n",
      "type": "blob"
    },
    "lib/file_saver": {
      "path": "lib/file_saver",
      "content": "/* FileSaver.js\n * A saveAs() FileSaver implementation.\n * 2013-10-21\n *\n * By Eli Grey, http://eligrey.com\n * License: X11/MIT\n *   See LICENSE.md\n */\n\n/*global self */\n/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,\n  plusplus: true */\n\n/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */\n\nvar saveAs = saveAs\n  || (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))\n  || (function(view) {\n  \"use strict\";\n\tvar\n\t\t  doc = view.document\n\t\t  // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet\n\t\t, get_URL = function() {\n\t\t\treturn view.URL || view.webkitURL || view;\n\t\t}\n\t\t, URL = view.URL || view.webkitURL || view\n\t\t, save_link = doc.createElementNS(\"http://www.w3.org/1999/xhtml\", \"a\")\n\t\t, can_use_save_link =  !view.externalHost && \"download\" in save_link\n\t\t, click = function(node) {\n\t\t\tvar event = doc.createEvent(\"MouseEvents\");\n\t\t\tevent.initMouseEvent(\n\t\t\t\t\"click\", true, false, view, 0, 0, 0, 0, 0\n\t\t\t\t, false, false, false, false, 0, null\n\t\t\t);\n\t\t\tnode.dispatchEvent(event);\n\t\t}\n\t\t, webkit_req_fs = view.webkitRequestFileSystem\n\t\t, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem\n\t\t, throw_outside = function (ex) {\n\t\t\t(view.setImmediate || view.setTimeout)(function() {\n\t\t\t\tthrow ex;\n\t\t\t}, 0);\n\t\t}\n\t\t, force_saveable_type = \"application/octet-stream\"\n\t\t, fs_min_size = 0\n\t\t, deletion_queue = []\n\t\t, process_deletion_queue = function() {\n\t\t\tvar i = deletion_queue.length;\n\t\t\twhile (i--) {\n\t\t\t\tvar file = deletion_queue[i];\n\t\t\t\tif (typeof file === \"string\") { // file is an object URL\n\t\t\t\t\tURL.revokeObjectURL(file);\n\t\t\t\t} else { // file is a File\n\t\t\t\t\tfile.remove();\n\t\t\t\t}\n\t\t\t}\n\t\t\tdeletion_queue.length = 0; // clear queue\n\t\t}\n\t\t, dispatch = function(filesaver, event_types, event) {\n\t\t\tevent_types = [].concat(event_types);\n\t\t\tvar i = event_types.length;\n\t\t\twhile (i--) {\n\t\t\t\tvar listener = filesaver[\"on\" + event_types[i]];\n\t\t\t\tif (typeof listener === \"function\") {\n\t\t\t\t\ttry {\n\t\t\t\t\t\tlistener.call(filesaver, event || filesaver);\n\t\t\t\t\t} catch (ex) {\n\t\t\t\t\t\tthrow_outside(ex);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t, FileSaver = function(blob, name) {\n\t\t\t// First try a.download, then web filesystem, then object URLs\n\t\t\tvar\n\t\t\t\t  filesaver = this\n\t\t\t\t, type = blob.type\n\t\t\t\t, blob_changed = false\n\t\t\t\t, object_url\n\t\t\t\t, target_view\n\t\t\t\t, get_object_url = function() {\n\t\t\t\t\tvar object_url = get_URL().createObjectURL(blob);\n\t\t\t\t\tdeletion_queue.push(object_url);\n\t\t\t\t\treturn object_url;\n\t\t\t\t}\n\t\t\t\t, dispatch_all = function() {\n\t\t\t\t\tdispatch(filesaver, \"writestart progress write writeend\".split(\" \"));\n\t\t\t\t}\n\t\t\t\t// on any filesys errors revert to saving with object URLs\n\t\t\t\t, fs_error = function() {\n\t\t\t\t\t// don't create more object URLs than needed\n\t\t\t\t\tif (blob_changed || !object_url) {\n\t\t\t\t\t\tobject_url = get_object_url(blob);\n\t\t\t\t\t}\n\t\t\t\t\tif (target_view) {\n\t\t\t\t\t\ttarget_view.location.href = object_url;\n\t\t\t\t\t} else {\n                        window.open(object_url, \"_blank\");\n                    }\n\t\t\t\t\tfilesaver.readyState = filesaver.DONE;\n\t\t\t\t\tdispatch_all();\n\t\t\t\t}\n\t\t\t\t, abortable = function(func) {\n\t\t\t\t\treturn function() {\n\t\t\t\t\t\tif (filesaver.readyState !== filesaver.DONE) {\n\t\t\t\t\t\t\treturn func.apply(this, arguments);\n\t\t\t\t\t\t}\n\t\t\t\t\t};\n\t\t\t\t}\n\t\t\t\t, create_if_not_found = {create: true, exclusive: false}\n\t\t\t\t, slice\n\t\t\t;\n\t\t\tfilesaver.readyState = filesaver.INIT;\n\t\t\tif (!name) {\n\t\t\t\tname = \"download\";\n\t\t\t}\n\t\t\tif (can_use_save_link) {\n\t\t\t\tobject_url = get_object_url(blob);\n\t\t\t\t// FF for Android has a nasty garbage collection mechanism\n\t\t\t\t// that turns all objects that are not pure javascript into 'deadObject'\n\t\t\t\t// this means `doc` and `save_link` are unusable and need to be recreated\n\t\t\t\t// `view` is usable though:\n\t\t\t\tdoc = view.document;\n\t\t\t\tsave_link = doc.createElementNS(\"http://www.w3.org/1999/xhtml\", \"a\");\n\t\t\t\tsave_link.href = object_url;\n\t\t\t\tsave_link.download = name;\n\t\t\t\tvar event = doc.createEvent(\"MouseEvents\");\n\t\t\t\tevent.initMouseEvent(\n\t\t\t\t\t\"click\", true, false, view, 0, 0, 0, 0, 0\n\t\t\t\t\t, false, false, false, false, 0, null\n\t\t\t\t);\n\t\t\t\tsave_link.dispatchEvent(event);\n\t\t\t\tfilesaver.readyState = filesaver.DONE;\n\t\t\t\tdispatch_all();\n\t\t\t\treturn;\n\t\t\t}\n\t\t\t// Object and web filesystem URLs have a problem saving in Google Chrome when\n\t\t\t// viewed in a tab, so I force save with application/octet-stream\n\t\t\t// http://code.google.com/p/chromium/issues/detail?id=91158\n\t\t\tif (view.chrome && type && type !== force_saveable_type) {\n\t\t\t\tslice = blob.slice || blob.webkitSlice;\n\t\t\t\tblob = slice.call(blob, 0, blob.size, force_saveable_type);\n\t\t\t\tblob_changed = true;\n\t\t\t}\n\t\t\t// Since I can't be sure that the guessed media type will trigger a download\n\t\t\t// in WebKit, I append .download to the filename.\n\t\t\t// https://bugs.webkit.org/show_bug.cgi?id=65440\n\t\t\tif (webkit_req_fs && name !== \"download\") {\n\t\t\t\tname += \".download\";\n\t\t\t}\n\t\t\tif (type === force_saveable_type || webkit_req_fs) {\n\t\t\t\ttarget_view = view;\n\t\t\t}\n\t\t\tif (!req_fs) {\n\t\t\t\tfs_error();\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tfs_min_size += blob.size;\n\t\t\treq_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {\n\t\t\t\tfs.root.getDirectory(\"saved\", create_if_not_found, abortable(function(dir) {\n\t\t\t\t\tvar save = function() {\n\t\t\t\t\t\tdir.getFile(name, create_if_not_found, abortable(function(file) {\n\t\t\t\t\t\t\tfile.createWriter(abortable(function(writer) {\n\t\t\t\t\t\t\t\twriter.onwriteend = function(event) {\n\t\t\t\t\t\t\t\t\ttarget_view.location.href = file.toURL();\n\t\t\t\t\t\t\t\t\tdeletion_queue.push(file);\n\t\t\t\t\t\t\t\t\tfilesaver.readyState = filesaver.DONE;\n\t\t\t\t\t\t\t\t\tdispatch(filesaver, \"writeend\", event);\n\t\t\t\t\t\t\t\t};\n\t\t\t\t\t\t\t\twriter.onerror = function() {\n\t\t\t\t\t\t\t\t\tvar error = writer.error;\n\t\t\t\t\t\t\t\t\tif (error.code !== error.ABORT_ERR) {\n\t\t\t\t\t\t\t\t\t\tfs_error();\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t};\n\t\t\t\t\t\t\t\t\"writestart progress write abort\".split(\" \").forEach(function(event) {\n\t\t\t\t\t\t\t\t\twriter[\"on\" + event] = filesaver[\"on\" + event];\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\twriter.write(blob);\n\t\t\t\t\t\t\t\tfilesaver.abort = function() {\n\t\t\t\t\t\t\t\t\twriter.abort();\n\t\t\t\t\t\t\t\t\tfilesaver.readyState = filesaver.DONE;\n\t\t\t\t\t\t\t\t};\n\t\t\t\t\t\t\t\tfilesaver.readyState = filesaver.WRITING;\n\t\t\t\t\t\t\t}), fs_error);\n\t\t\t\t\t\t}), fs_error);\n\t\t\t\t\t};\n\t\t\t\t\tdir.getFile(name, {create: false}, abortable(function(file) {\n\t\t\t\t\t\t// delete file if it already exists\n\t\t\t\t\t\tfile.remove();\n\t\t\t\t\t\tsave();\n\t\t\t\t\t}), abortable(function(ex) {\n\t\t\t\t\t\tif (ex.code === ex.NOT_FOUND_ERR) {\n\t\t\t\t\t\t\tsave();\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tfs_error();\n\t\t\t\t\t\t}\n\t\t\t\t\t}));\n\t\t\t\t}), fs_error);\n\t\t\t}), fs_error);\n\t\t}\n\t\t, FS_proto = FileSaver.prototype\n\t\t, saveAs = function(blob, name) {\n\t\t\treturn new FileSaver(blob, name);\n\t\t}\n\t;\n\tFS_proto.abort = function() {\n\t\tvar filesaver = this;\n\t\tfilesaver.readyState = filesaver.DONE;\n\t\tdispatch(filesaver, \"abort\");\n\t};\n\tFS_proto.readyState = FS_proto.INIT = 0;\n\tFS_proto.WRITING = 1;\n\tFS_proto.DONE = 2;\n\n\tFS_proto.error =\n\tFS_proto.onwritestart =\n\tFS_proto.onprogress =\n\tFS_proto.onwrite =\n\tFS_proto.onabort =\n\tFS_proto.onerror =\n\tFS_proto.onwriteend =\n\t\tnull;\n\n\tview.addEventListener(\"unload\", process_deletion_queue, false);\n\treturn saveAs;\n}(window));\n\nif (typeof module !== 'undefined') module.exports = saveAs;\n",
      "type": "blob"
    },
    "loader": {
      "path": "loader",
      "content": "(function() {\n  var Loader, TRANSPARENT_RGBA, arrayToHex, colorToRGBA, distanceSquared, getColor, nearestColorIndex, numberToHex;\n\n  Loader = function(I, self) {\n    if (I == null) {\n      I = {};\n    }\n    if (self == null) {\n      self = Core(I);\n    }\n    return self.extend({\n      load: function(dataURL) {\n        var context, deferred, image;\n        deferred = Deferred();\n        context = document.createElement('canvas').getContext('2d');\n        image = document.createElement(\"image\");\n        image.onload = function() {\n          var height, imageData, width;\n          width = image.width, height = image.height;\n          context.drawImage(image, 0, 0);\n          imageData = context.getImageData(0, 0, width, height);\n          return deferred.resolve(imageData);\n        };\n        image.onerror = function() {\n          return deferred.reject(\"Error loading image data\");\n        };\n        image.src = dataURL;\n        return deferred.promise();\n      },\n      fromImageData: function(imageData) {\n        var colorFrequency, colors, data, height, palette, table, width, _i, _j, _ref, _ref1, _results, _results1;\n        width = imageData.width, height = imageData.height;\n        colorFrequency = {};\n        colors = (function() {\n          _results = [];\n          for (var _i = 0, _ref = width * height; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }\n          return _results;\n        }).apply(this).map(function(n) {\n          var color, pieces;\n          pieces = getColor(imageData, n);\n          color = arrayToHex(pieces);\n          console.log(color);\n          if (colorFrequency[color] == null) {\n            colorFrequency[color] = 0;\n          }\n          colorFrequency[color] += 1;\n          return color;\n        });\n        table = Object.keys(colorFrequency).sort(function(a, b) {\n          return colorFrequency[b] - colorFrequency[a];\n        }).reduce(function(table, color, index) {\n          table[color] = index;\n          return table;\n        }, {});\n        palette = Object.keys(table);\n        data = (function() {\n          _results1 = [];\n          for (var _j = 0, _ref1 = width * height; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; 0 <= _ref1 ? _j++ : _j--){ _results1.push(_j); }\n          return _results1;\n        }).apply(this).map(function(n) {\n          return table[colors[n]];\n        });\n        return {\n          palette: palette,\n          width: width,\n          height: height,\n          data: data\n        };\n      },\n      fromImageDataWithPalette: function(imageData, palette) {\n        var height, paletteData, width, _i, _ref, _results;\n        width = imageData.width, height = imageData.height;\n        paletteData = palette.map(colorToRGBA);\n        return {\n          width: width,\n          height: height,\n          data: (function() {\n            _results = [];\n            for (var _i = 0, _ref = width * height; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }\n            return _results;\n          }).apply(this).map(function(n) {\n            return nearestColorIndex(getColor(imageData, n), paletteData);\n          })\n        };\n      }\n    });\n  };\n\n  module.exports = Loader;\n\n  arrayToHex = function(parts) {\n    if (parts[3] < 128) {\n      return \"transparent\";\n    } else {\n      return \"#\" + (parts.slice(0, 3).map(numberToHex).join(''));\n    }\n  };\n\n  TRANSPARENT_RGBA = [Infinity, 0, 0, 0xff];\n\n  colorToRGBA = function(colorString) {\n    if (colorString === \"transparent\") {\n      return TRANSPARENT_RGBA;\n    } else {\n      return colorString.match(/([0-9A-F]{2})/g).map(function(part) {\n        return parseInt(part, 0x10);\n      }).concat([0]);\n    }\n  };\n\n  distanceSquared = function(a, b) {\n    return a.slice(0, 3).map(function(n, index) {\n      var delta;\n      delta = n - b[index];\n      return delta * delta;\n    }).sum();\n  };\n\n  nearestColorIndex = function(colorData, paletteData) {\n    var paletteColor;\n    if (colorData[3] < 128) {\n      return 0;\n    }\n    paletteColor = paletteData.minimum(function(paletteEntry) {\n      return distanceSquared(paletteEntry, colorData);\n    });\n    return paletteData.indexOf(paletteColor);\n  };\n\n  getColor = function(imageData, x, y) {\n    var index, stride;\n    stride = 4;\n    if (y != null) {\n      index = (x + y * imageData.width) * stride;\n    } else {\n      index = x * stride;\n    }\n    return Array.prototype.slice.call(imageData.data, index, index + stride);\n  };\n\n  numberToHex = function(n) {\n    return (\"0\" + (n.toString(0x10))).slice(-2).toUpperCase();\n  };\n\n}).call(this);\n\n//# sourceURL=loader.coffee",
      "type": "blob"
    },
    "modal": {
      "path": "modal",
      "content": "(function() {\n  var Modal;\n\n  $(function() {\n    return $(\"#modal\").click(function(e) {\n      if (e.target === this) {\n        return Modal.hide();\n      }\n    });\n  });\n\n  module.exports = Modal = {\n    show: function(element) {\n      return $(\"#modal\").empty().append(element).addClass(\"active\");\n    },\n    hide: function() {\n      return $(\"#modal\").removeClass(\"active\");\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=modal.coffee",
      "type": "blob"
    },
    "palette": {
      "path": "palette",
      "content": "(function() {\n  var Palette, TRANSPARENT, colorToRGB, exportJASC, fromStrings, numberToHex;\n\n  fromStrings = function(lines) {\n    return lines.split(\"\\n\").map(function(line) {\n      return \"#\" + line.split(\" \").map(function(string) {\n        return numberToHex(parseInt(string, 10));\n      }).join(\"\");\n    });\n  };\n\n  numberToHex = function(n) {\n    return (\"0\" + (n.toString(0x10))).slice(-2).toUpperCase();\n  };\n\n  TRANSPARENT = [0xff, 0, 0xff];\n\n  colorToRGB = function(colorString) {\n    if (colorString === \"transparent\") {\n      return TRANSPARENT;\n    } else {\n      return colorString.match(/([0-9A-F]{2})/g).map(function(part) {\n        return parseInt(part, 0x10);\n      });\n    }\n  };\n\n  exportJASC = function(array) {\n    var entries, padding, zeroes, _i, _results;\n    entries = array.map(function(entry) {\n      return colorToRGB(entry).join(\" \");\n    }).join(\"\\n\");\n    padding = Math.max(0, 256 - array.length);\n    zeroes = (function() {\n      _results = [];\n      for (var _i = 0; 0 <= padding ? _i < padding : _i > padding; 0 <= padding ? _i++ : _i--){ _results.push(_i); }\n      return _results;\n    }).apply(this).map(function() {\n      return \"0 0 0\";\n    }).join(\"\\n\");\n    return \"JASC-PAL\\n0100\\n256\\n\" + entries + \"\\n\" + zeroes;\n  };\n\n  Palette = {\n    defaults: [\"transparent\", \"#000000\", \"#FFFFFF\", \"#666666\", \"#DCDCDC\", \"#EB070E\", \"#F69508\", \"#FFDE49\", \"#388326\", \"#0246E3\", \"#563495\", \"#58C4F5\", \"#E5AC99\", \"#5B4635\", \"#FFFEE9\"],\n    dawnBringer16: fromStrings(\"20 12 28\\n68 36 52\\n48 52 109\\n78 74 78\\n133 76 48\\n52 101 36\\n208 70 72\\n117 113 97\\n89 125 206\\n210 125 44\\n133 149 161\\n109 170 44\\n210 170 153\\n109 194 202\\n218 212 94\\n222 238 214\"),\n    dawnBringer32: fromStrings(\"0 0 0\\n34 32 52\\n69 40 60\\n102 57 49\\n143 86 59\\n223 113 38\\n217 160 102\\n238 195 154\\n251 242 54\\n153 229 80\\n106 190 48\\n55 148 110\\n75 105 47\\n82 75 36\\n50 60 57\\n63 63 116\\n48 96 130\\n91 110 225\\n99 155 255\\n95 205 228\\n203 219 252\\n255 255 255\\n155 173 183\\n132 126 135\\n105 106 106\\n89 86 82\\n118 66 138\\n172 50 50\\n217 87 99\\n215 123 186\\n143 151 74\\n138 111 48\"),\n    \"export\": exportJASC\n  };\n\n  module.exports = Palette;\n\n}).call(this);\n\n//# sourceURL=palette.coffee",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.1.0\",\"entryPoint\":\"editor\",\"remoteDependencies\":[\"//code.jquery.com/jquery-1.10.1.min.js\",\"//cdnjs.cloudflare.com/ajax/libs/coffee-script/1.6.3/coffee-script.min.js\",\"http://strd6.github.io/tempest/javascripts/envweb-v0.4.6.js\",\"http://strd6.github.io/require/v0.2.2.js?\"],\"dependencies\":{\"appcache\":\"STRd6/appcache:v0.1.0\",\"compression\":\"STRd6/lz-string:v1.3.3\",\"jquery-utils\":\"STRd6/jquery-utils:v0.1.2\",\"runtime\":\"STRd6/runtime:v0.1.1\",\"touch-canvas\":\"STRd6/touch-canvas:v0.2.0\",\"commando\":\"STRd6/commando:v0.9.0\",\"grid-gen\":\"STRd6/grid-gen:v0.1.0\"},\"width\":1024,\"height\":576};",
      "type": "blob"
    },
    "style": {
      "path": "style",
      "content": "module.exports = \"html,\\nbody {\\n  margin: 0;\\n  height: 100%;\\n}\\n\\n.editor {\\n  background-color: lightgray;\\n  height: 100%;\\n  padding: 0px 80px 40px 40px;\\n  position: relative;\\n  overflow: hidden;\\n  -ms-box-sizing: border-box;\\n  -moz-box-sizing: border-box;\\n  -webkit-box-sizing: border-box;\\n  box-sizing: border-box;\\n  -ms-user-select: none;\\n  -moz-user-select: none;\\n  -webkit-user-select: none;\\n  user-select: none;\\n}\\n\\n.editor .main {\\n  font-size: 0;\\n  height: 100%;\\n  position: relative;\\n  overflow: auto;\\n}\\n\\nhr {\\n  border-color: gray;\\n  border-style: solid;\\n  border-top: none;\\n}\\n\\n.icon {\\n  width: 16px;\\n  height: 16px;\\n  display: inline-block;\\n  -ms-box-sizing: border-box;\\n  -moz-box-sizing: border-box;\\n  -webkit-box-sizing: border-box;\\n  box-sizing: border-box;\\n}\\n\\n.up {\\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABcElEQVQ4T2NkoBAw4tNfeDT15L8//35PtJ9rg0sdTgMKDqdcFGeX1Pv77y/Do3cPL8zyWmqIzRAMA0JXhbLJSPBfFeUQV1HgUWL49+8fw43X1xkevn5468e1G7qrG67+QjYIw4CCQym7//z5YyPGLsGhwK/I8O//P4an758yXHpw8cfv378Prkve4YHXAJhkyuao/1by1gx/gS44efskw8sPLyw3p+45ge4NnGEQtyb0v7WyLdAFfxl2nN7BsDF9J1a1OA2IWOr/30bdDmzA9mPbGbbn7yfNgKC5nv/tdB0Y/gIN2HpgK8O+8qOkGeA9xeW/gzHQAGA0btmzheFI/WnSDHDtsfvvaOEEjMa/DBu3b2Y43X6BNAPsWiz+O9u6gMNgw8aNDBf7r5FmgEWN0X9XZzewAevXbGC4Nu02aQYYlej8d/dwZ/gHhOtWbGC4Pec+aQbo5Kr///P7L8Of338Y/v75y3B/4WPSDCA2lwMAYbWkEeqTidIAAAAASUVORK5CYII=);\\n}\\n\\n.down {\\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABbUlEQVQ4T2NkoBAw4tJffDz9//9//xn+/vkHxH8ZpjjPx6oWpwGFR1L/W4rYMPz7/49h/4O9DDM9l5BmQN7+pP8W4tYM//79Y9h3dy/DPP8VpBmQuSvuv6UU0ACgC/Zc282wJHwdaQakbI76byVvzfAX6ILdF3cxrIrfTJoBcWtC/1sr2wJd8Jdhx+kdDBvTd5JmQMRS//826nZgA7Yf286wPX8/aQYEzfX8b6frwPAXaMDWA1sZ9pUfJc0A7yku/x2MgQb8+8uwZc8WhiP1p4k3wHOSgwU3O+9xI21jYDT+Zdi4fTPD6fYLxBngMcFhx+9ff+w1lDQ4xEQlwGFw4eJFhtu3bv/48/vvkVuz7rkip14MU7UbtNkEGbkvS4lLqamra4ANOH/uAsPtG3fv3P54T5thNcMvvAbAJA1LtM9LS8kY/P37l+HOjbuXbs+9r48t3+DMCyDF6unKR4AZifXO3AfmuDIdXgOIyekAYp2eEfJ3A60AAAAASUVORK5CYII=);\\n}\\n\\n.minus {\\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACpUlEQVQ4T6WT/UtTURjHv/fqNuesMWs0XzLyhUSKxEhUsBw2SFHRhkaGikG+QP4FgWJ/QSBBRD+oPxgEi3LiC6lQ9oNkZJiK7CV1g6ml4gu7d96dc27XDa2V9kvPj+d5ns855/t8Hw7/Gdyf/Z6mpjTG87WEY/WyREwMFJDpahCsV6ZC36We1+7feyIASy0PrDJI18msjARddjY4gx4IiAiu+rA5OorNjfUVRklbzgu77QByCNhvVm7qibcU6XTZl0Hdc8CaF5AkcHEGcOdSsGEfhHfJ6SeENuS9HAlBQoDl1tZUWcbEqWv5ibFXc0DH+yGIAXA0CI1aBY7JkKUAkJWDH8Nv4V3z+CgNFBbaPnwLARabm9t1ScbO+FtVYJNjoMIuRFFEjCRGSET9IlS5Zix0P8OWCh1FtolHIYC79b7TZLmeriIBCMsOkK8ROh1C1CY9+DMp8G+LmJ995zK/mswIAZwt94SUyjIt5/gCYWcb+oePjxzu9zvlUBkMiLqSh0/93WJx/1RsCOBorBPOlhRrOec0mPIKbfvTYwHcCT00uQX4OPBctLyZDgPmG+86TVkZ6VoVBfEsQvBtHW0vnocm8yJ2AhLmp4ddN4dmw1+Yqatu1wb8nUnVtyGNDIDxBMHdYKSAypjAq6EvKcdn2xPsSv6O0qGFsIgztdZUomYTxlh9Yry5CKLdDsUwii2o4kOlhDKlKhonyyrgGR/E8tqcjxJWWDbqCI9xP6ZqSq3gaY8x7rTOaLZAWnJDcrvBJAbNhXSok8/DO2bH4rrDT3jWUDG48MtIB5DJmhtWQklXDAsmJGfmQ21KDKUEnweuufcQiLhCeLntoHk/99cyjVUWpEUxWkujUS8zYpL3giDRbFUmtHdvL9hXNe46fpmOlv7fpz8BWfs5IPbTMp0AAAAASUVORK5CYII=);\\n}\\n\\n.plus {\\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC1ElEQVQ4T6WTWUhUURjH/3NdJ3EpxBkXChw1FVFJTbBMJSGSikAqSlAfIloY0ITKEE0rbXmI9MFKihSyTSHQMbUQy9weLC1NzVFDc4/EGe8dZ+4953bnirZKD33n7XD+v+98y1+B/wzF7/qLdVqNLaM4wgs0lRCiFigBT4RpCxEqOJO58k764+GfNb8AiupPJ1ORlmxUaTwD1WFQ2jnDQi2YWZxA+1ATZuZmp3hCtPfSq6tXIKsAq1gUSXmkf5xTgEco9IZBTJsmwFMervau8FB6o3WwAb36j6xAhLSHx+pkiAwoqs30FW1IS7hmm1eAKgzNUw3gWA68KMDR0QGidMzUjCCXELQNvMTgiH6SM3Oxusw3IzKgsE6b67ZelZ+weR865l5j0cKCZVmcjc6Xf3r5bTZMrAGMnS2i1bGoaLoN1sjn6TJeFciA/JpTQ5HB8X5mxoLhr0NS3TyMRgOKdhbLgJNVKXB2s4NABQRIvTEbWeg6X+gbs9r8ZUDOs+Ncwpa9ykFjH+YX53F+a+Ffh5tRfxguSjeEuEeitK7M1Hymc50MOFd9lIsJT1T2G3phIkvIi7i+JsDZ3gWhqijcrLllas3uWgZkPUkb8vMN9qMOIr4YxsDxS2BnDSg78FQGWTNbg1Ew8HcPBrfAoapdp+/I6VkuQfsoJdfCmPL3RBxC63gjlggPe6rA1cT7qwBKRNgztoj3S8KN2mIsGBbzui70LTfxxINkX15gWtQqd68ozQ60fq6XG0akLRSJ9YUIO8YGcZokNHTr0N7fM8kvCbEfrnxaHqM10u7uTyaUL/dWq51iAxMxvjCKiflRiJTCZ4MvfFw24Xl3DTr6e1lpvdPeFwz8WKQVyMHSXck8JSXURvCMC9oOlaunNTnGv42h4V0TDEZ2ihepdkVs1f1hpt3XYjTURjITJalEECQzCZKZyLRkrgqemit7L+nXNtNfZ/ePy+9WQGAgmKlaSQAAAABJRU5ErkJggg==);\\n}\\n\\n.toolbar {\\n  background-color: white;\\n  height: 100%;\\n  width: 40px;\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  -ms-box-sizing: border-box;\\n  -moz-box-sizing: border-box;\\n  -webkit-box-sizing: border-box;\\n  box-sizing: border-box;\\n}\\n\\n.toolbar .tool.active {\\n  background-color: white;\\n  border-color: green;\\n}\\n\\n.toolbar .tool {\\n  background-color: lightgray;\\n  background-position: center;\\n  background-repeat: no-repeat;\\n  width: 36px;\\n  height: 36px;\\n  border: 1px solid rgba(0, 0, 0, 0.5);\\n  border-radius: 2px;\\n  margin: 2px;\\n  -ms-box-sizing: border-box;\\n  -moz-box-sizing: border-box;\\n  -webkit-box-sizing: border-box;\\n  box-sizing: border-box;\\n}\\n\\n.layers {\\n  background-color: white;\\n  font-size: 14px;\\n  height: 100%;\\n  width: 40px;\\n  position: absolute;\\n  top: 0;\\n  right: 0;\\n  -ms-box-sizing: border-box;\\n  -moz-box-sizing: border-box;\\n  -webkit-box-sizing: border-box;\\n  box-sizing: border-box;\\n}\\n\\n.layers .layer.active canvas {\\n  border-color: green;\\n}\\n\\n.layers .layer.hidden {\\n  opacity: 0.5;\\n  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);\\n  filter: alpha(opacity=50);\\n}\\n\\n.layers .layer .eye {\\n  position: absolute;\\n  top: 0;\\n  right: 0;\\n  width: 16px;\\n  height: 16px;\\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACnElEQVQ4T6WT30uTYRTHv8/27n33y/ljaptLzGpEoEZBQRKYBBFdREUXQhFddRNdRBF2ZX9BVJDQpRddRaQhWlBkISoqU2ammWtzzl85N51u757nffa8vZskSHd54Fye7/mcc76HYI9B9liPXQKhUOiMbNIeEXWtmbCMjQgO5IwUOYCYKezuUa3I11pTU9P/t/GOQDQa7TCrqy1mFpdlkwSNZbGeSIIzBsUMVLgcyDEKLnRd+E50e/z1l/IiBQGj+IO0ETovQ0NsYRHRpQSyxAlN8UDLETAu4OArqMIi6qvdMBlEoqp+ovzYuQYSDoefKOrCPVlLIfgjAvnAWcSoF5pBTjUdWSOpJqAygbpqGUdT3XCkwnBazEgdbO4gsdngMknO7NvQS+A/3oSeQAbraVEofni9AQYwHrSPG0ICVgtB69UyxKeGICZ6sbrJOQkPdwqbp44UV/ggSRLeDqWxtsVBDYK2W9sCd56NgVIBu2JCW0s5OOdIL/xE5N0LkFgkxO2uUrMsy7BYLOifVjEepsgayPmulOVHyI8icMpvx40mFzRNAzOWm/z6SifR4JeE4qosVUq8BYLldYFPwTTmfmvI8u3583vwFEu41lgEv9dSIFANAnXkDSNzM99eKonp2yaHG2Z3LUy2YkRXGcZ+ZfF9nhoX0HHYI+Ok34Yj+60QNAMtEgAd7UJU8g0WzjgdGBhwrE2etkkEelltUndUZom9lOmSLP4aRtd1IB6xitCgl81PYirrWLpw/6lvx0jDfe+76PLMxSqSkpx2K6C4ICx2Y4mGWQxH8q0ksDKLcHxT3yw5NDry+nPj474+vsvKPc/vKiylXmaMXjFgmmUQp5lwomtCZKgaUFXaqeu892b7x6l/rPy/T7Xnb/wDHedWhDseHEQAAAAASUVORK5CYII=);\\n}\\n\\n.layers .layer {\\n  padding: 8px 0 2px;\\n  position: relative;\\n}\\n\\n.layers .thumbnail {\\n  padding: 2px 0;\\n}\\n\\n.layers canvas {\\n  border: 1px solid lightgray;\\n  display: block;\\n  margin: auto;\\n  -ms-box-sizing: border-box;\\n  -moz-box-sizing: border-box;\\n  -webkit-box-sizing: border-box;\\n  box-sizing: border-box;\\n}\\n\\n.palette {\\n  background-color: white;\\n  height: 100%;\\n  width: 40px;\\n  position: absolute;\\n  top: 0;\\n  right: 40px;\\n  font-size: 0;\\n  -ms-box-sizing: border-box;\\n  -moz-box-sizing: border-box;\\n  -webkit-box-sizing: border-box;\\n  box-sizing: border-box;\\n}\\n\\n.palette .color.current {\\n  float: none;\\n  width: 36px;\\n  height: 36px;\\n}\\n\\n.palette .color {\\n  border: 1px solid rgba(0, 0, 0, 0.5);\\n  border-radius: 2px;\\n  float: left;\\n  width: 16px;\\n  height: 16px;\\n  margin: 2px;\\n  -ms-box-sizing: border-box;\\n  -moz-box-sizing: border-box;\\n  -webkit-box-sizing: border-box;\\n  box-sizing: border-box;\\n}\\n\\n.vertical-center {\\n  position: absolute;\\n  top: 0;\\n  bottom: 0;\\n  left: 0;\\n  right: 0;\\n  margin: auto;\\n}\\n\\n.viewport {\\n  background-color: white;\\n  border: 1px solid gray;\\n  margin: auto;\\n}\\n\\n.viewport canvas {\\n  background-color: transparent;\\n  position: absolute;\\n}\\n\\n.viewport .overlay {\\n  pointer-events: none;\\n  position: absolute;\\n  z-index: 1;\\n}\\n\\n.debug {\\n  background-color: white;\\n  position: absolute;\\n  width: 100%;\\n  height: 100px;\\n  bottom: 0;\\n  margin: 0;\\n  padding: 1em;\\n  -ms-box-sizing: border-box;\\n  -moz-box-sizing: border-box;\\n  -webkit-box-sizing: border-box;\\n  box-sizing: border-box;\\n}\\n\\n.actions {\\n  background-color: white;\\n  width: 100%;\\n  height: 40px;\\n  padding: 0px 40px;\\n  position: absolute;\\n  bottom: 0;\\n  left: 0;\\n  -ms-box-sizing: border-box;\\n  -moz-box-sizing: border-box;\\n  -webkit-box-sizing: border-box;\\n  box-sizing: border-box;\\n}\\n\\n.actions .action {\\n  background-color: lightgray;\\n  background-position: center;\\n  background-repeat: no-repeat;\\n  width: 36px;\\n  height: 36px;\\n  border: 1px solid rgba(0, 0, 0, 0.5);\\n  border-radius: 2px;\\n  display: inline-block;\\n  margin: 2px;\\n  -ms-box-sizing: border-box;\\n  -moz-box-sizing: border-box;\\n  -webkit-box-sizing: border-box;\\n  box-sizing: border-box;\\n}\\n\\n#modal {\\n  background-color: rgba(0, 0, 0, 0.25);\\n  display: none;\\n  position: absolute;\\n  z-index: 9000;\\n  top: 0;\\n}\\n\\n#modal input[type=file] {\\n  padding: 5em 2em;\\n  width: 320px;\\n  height: 180px;\\n  -ms-box-sizing: border-box;\\n  -moz-box-sizing: border-box;\\n  -webkit-box-sizing: border-box;\\n  box-sizing: border-box;\\n}\\n\\n#modal > * {\\n  background-color: white;\\n  border: 1px solid black;\\n  margin: auto;\\n  position: absolute;\\n  top: 0;\\n  bottom: 0;\\n  left: 0;\\n  right: 0;\\n}\\n\\n#modal.active {\\n  display: block;\\n  width: 100%;\\n  height: 100%;\\n}\\n\\n@media all and (-webkit-min-device-pixel-ratio: 1.5) {\\n  .up {\\n    background-image: url(\\\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABcElEQVQ4T2NkoBAw4tNfeDT15L8/35PtJ9rg0sdTgMKDqdcFGeX1Pv77y/Do3cPL8zyWmqIzRAMA0JXhbLJSPBfFeUQV1HgUWL49+8fw43X1xkevn5468e1G7qrG67+QjYIw4CCQym7/z5YyPGLsGhwK/I8O/P4an758yXHpw8cfv378Prkve4YHXAJhkyuao/1by1gx/gS44efskw8sPLyw3p+45ge4NnGEQtyb0v7WyLdAFfxl2nN7BsDF9J1a1OA2IWOr/30bdDmzA9mPbGbbn7yfNgKC5nv/tdB0Y/gIN2HpgK8O+8qOkGeA9xeW/gzHQAGA0btmzheFI/WnSDHDtsfvvaOEEjMa/DBu3b2Y43X6BNAPsWiz+O9u6gMNgw8aNDBf7r5FmgEWN0X9XZzewAevXbGC4Nu02aQYYlej8d/dwZ/gHhOtWbGC4Pec+aQbo5Kr/P7L8Of338Y/v75y3B/4WPSDCA2lwMAYbWkEeqTidIAAAAASUVORK5CYII=@2x\\\");\\n    background-size: contain;\\n  }\\n}\\n\\n@media all and (-webkit-min-device-pixel-ratio: 1.5) {\\n  .down {\\n    background-image: url(\\\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABbUlEQVQ4T2NkoBAw4tJffDz9/9/xn+/vkHxH8ZpjjPx6oWpwGFR1L/W4rYMPz7/49h/4O9DDM9l5BmQN7+pP8W4tYM/79Y9h3dy/DPP8VpBmQuSvuv6UU0ACgC/Zc282wJHwdaQakbI76byVvzfAX6ILdF3cxrIrfTJoBcWtC/1sr2wJd8Jdhx+kdDBvTd5JmQMRS/826nZgA7Yf286wPX8/aQYEzfX8b6frwPAXaMDWA1sZ9pUfJc0A7yku/x2MgQb8+8uwZc8WhiP1p4k3wHOSgwU3O+9xI21jYDT+Zdi4fTPD6fYLxBngMcFhx+9ff+w1lDQ4xEQlwGFw4eJFhtu3bv/48/vvkVuz7rkip14MU7UbtNkEGbkvS4lLqamra4ANOH/uAsPtG3fv3P54T5thNcMvvAbAJA1LtM9LS8kY/P37l+HOjbuXbs+9r48t3+DMCyDF6unKR4AZifXO3AfmuDIdXgOIyekAYp2eEfJ3A60AAAAASUVORK5CYII=@2x\\\");\\n    background-size: contain;\\n  }\\n}\\n\\n@media all and (-webkit-min-device-pixel-ratio: 1.5) {\\n  .minus {\\n    background-image: url(\\\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACpUlEQVQ4T6WT/UtTURjHv/fqNuesMWs0XzLyhUSKxEhUsBw2SFHRhkaGikG+QP4FgWJ/QSBBRD+oPxgEi3LiC6lQ9oNkZJiK7CV1g6ml4gu7d96dc27XDa2V9kvPj+d5ns855/t8Hw7/Gdyf/Z6mpjTG87WEY/WyREwMFJDpahCsV6ZC36We1+7feyIASy0PrDJI18msjARddjY4gx4IiAiu+rA5OorNjfUVRklbzgu77QByCNhvVm7qibcU6XTZl0Hdc8CaF5AkcHEGcOdSsGEfhHfJ6SeENuS9HAlBQoDl1tZUWcbEqWv5ibFXc0DH+yGIAXA0CI1aBY7JkKUAkJWDH8Nv4V3z+CgNFBbaPnwLARabm9t1ScbO+FtVYJNjoMIuRFFEjCRGSET9IlS5Zix0P8OWCh1FtolHIYC79b7TZLmeriIBCMsOkK8ROh1C1CY9+DMp8G+LmJ995zK/mswIAZwt94SUyjIt5/gCYWcb+oePjxzu9zvlUBkMiLqSh0/93WJx/1RsCOBorBPOlhRrOec0mPIKbfvTYwHcCT00uQX4OPBctLyZDgPmG+86TVkZ6VoVBfEsQvBtHW0vnocm8yJ2AhLmp4ddN4dmw1+Yqatu1wb8nUnVtyGNDIDxBMHdYKSAypjAq6EvKcdn2xPsSv6O0qGFsIgztdZUomYTxlh9Yry5CKLdDsUwii2o4kOlhDKlKhonyyrgGR/E8tqcjxJWWDbqCI9xP6ZqSq3gaY8x7rTOaLZAWnJDcrvBJAbNhXSok8/DO2bH4rrDT3jWUDG48MtIB5DJmhtWQklXDAsmJGfmQ21KDKUEnweuufcQiLhCeLntoHk/99cyjVUWpEUxWkujUS8zYpL3giDRbFUmtHdvL9hXNe46fpmOlv7fpz8BWfs5IPbTMp0AAAAASUVORK5CYII=@2x\\\");\\n    background-size: contain;\\n  }\\n}\\n\\n@media all and (-webkit-min-device-pixel-ratio: 1.5) {\\n  .plus {\\n    background-image: url(\\\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC1ElEQVQ4T6WTWUhUURjH/3NdJ3EpxBkXChw1FVFJTbBMJSGSikAqSlAfIloY0ITKEE0rbXmI9MFKihSyTSHQMbUQy9weLC1NzVFDc4/EGe8dZ+4953bnirZKD33n7XD+v+98y1+B/wzF7/qLdVqNLaM4wgs0lRCiFigBT4RpCxEqOJO58k764+GfNb8AiupPJ1ORlmxUaTwD1WFQ2jnDQi2YWZxA+1ATZuZmp3hCtPfSq6tXIKsAq1gUSXmkf5xTgEco9IZBTJsmwFMervau8FB6o3WwAb36j6xAhLSHx+pkiAwoqs30FW1IS7hmm1eAKgzNUw3gWA68KMDR0QGidMzUjCCXELQNvMTgiH6SM3Oxusw3IzKgsE6b67ZelZ+weR865l5j0cKCZVmcjc6Xf3r5bTZMrAGMnS2i1bGoaLoN1sjn6TJeFciA/JpTQ5HB8X5mxoLhr0NS3TyMRgOKdhbLgJNVKXB2s4NABQRIvTEbWeg6X+gbs9r8ZUDOs+Ncwpa9ykFjH+YX53F+a+Ffh5tRfxguSjeEuEeitK7M1Hymc50MOFd9lIsJT1T2G3phIkvIi7i+JsDZ3gWhqijcrLllas3uWgZkPUkb8vMN9qMOIr4YxsDxS2BnDSg78FQGWTNbg1Ew8HcPBrfAoapdp+/I6VkuQfsoJdfCmPL3RBxC63gjlggPe6rA1cT7qwBKRNgztoj3S8KN2mIsGBbzui70LTfxxINkX15gWtQqd68ozQ60fq6XG0akLRSJ9YUIO8YGcZokNHTr0N7fM8kvCbEfrnxaHqM10u7uTyaUL/dWq51iAxMxvjCKiflRiJTCZ4MvfFw24Xl3DTr6e1lpvdPeFwz8WKQVyMHSXck8JSXURvCMC9oOlaunNTnGv42h4V0TDEZ2ihepdkVs1f1hpt3XYjTURjITJalEECQzCZKZyLRkrgqemit7L+nXNtNfZ/ePy+9WQGAgmKlaSQAAAABJRU5ErkJggg==@2x\\\");\\n    background-size: contain;\\n  }\\n}\\n\\n@media all and (-webkit-min-device-pixel-ratio: 1.5) {\\n  .layers .layer .eye {\\n    background-image: url(\\\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACnElEQVQ4T6WT30uTYRTHv8/27n33y/ljaptLzGpEoEZBQRKYBBFdREUXQhFddRNdRBF2ZX9BVJDQpRddRaQhWlBkISoqU2ammWtzzl85N51u757nffa8vZskSHd54Fye7/mcc76HYI9B9liPXQKhUOiMbNIeEXWtmbCMjQgO5IwUOYCYKezuUa3I11pTU9P/t/GOQDQa7TCrqy1mFpdlkwSNZbGeSIIzBsUMVLgcyDEKLnRd+E50e/z1l/IiBQGj+IO0ETovQ0NsYRHRpQSyxAlN8UDLETAu4OArqMIi6qvdMBlEoqp+ovzYuQYSDoefKOrCPVlLIfgjAvnAWcSoF5pBTjUdWSOpJqAygbpqGUdT3XCkwnBazEgdbO4gsdngMknO7NvQS+A/3oSeQAbraVEofni9AQYwHrSPG0ICVgtB69UyxKeGICZ6sbrJOQkPdwqbp44UV/ggSRLeDqWxtsVBDYK2W9sCd56NgVIBu2JCW0s5OOdIL/xE5N0LkFgkxO2uUrMsy7BYLOifVjEepsgayPmulOVHyI8icMpvx40mFzRNAzOWm/z6SifR4JeE4qosVUq8BYLldYFPwTTmfmvI8u3583vwFEu41lgEv9dSIFANAnXkDSNzM99eKonp2yaHG2Z3LUy2YkRXGcZ+ZfF9nhoX0HHYI+Ok34Yj+60QNAMtEgAd7UJU8g0WzjgdGBhwrE2etkkEelltUndUZom9lOmSLP4aRtd1IB6xitCgl81PYirrWLpw/6lvx0jDfe+76PLMxSqSkpx2K6C4ICx2Y4mGWQxH8q0ksDKLcHxT3yw5NDry+nPj474+vsvKPc/vKiylXmaMXjFgmmUQp5lwomtCZKgaUFXaqeu892b7x6l/rPy/T7Xnb/wDHedWhDseHEQAAAAASUVORK5CYII=@2x\\\");\\n    background-size: contain;\\n  }\\n}\";",
      "type": "blob"
    },
    "templates/debug": {
      "path": "templates/debug",
      "content": "module.exports = Function(\"return \" + HAMLjr.compile(\"\\n\\n%pre.debug\\n  - each @items, (item) ->\\n    = item\\n\", {compiler: CoffeeScript}))()",
      "type": "blob"
    },
    "templates/editor": {
      "path": "templates/editor",
      "content": "module.exports = Function(\"return \" + HAMLjr.compile(\"\\n\\n- activeIndex = @activeIndex\\n- activeTool = @activeTool\\n- editor = this\\n\\n.editor\\n\\n\\n\\n  .toolbar\\n    - each @tools, (tool) ->\\n      - activeClass = -> \\\"active\\\" if tool is activeTool()\\n      .tool(style=\\\"background-image: url(#{tool.iconUrl})\\\" class=activeClass)\\n        -on \\\"click\\\", (e) ->\\n          - activeTool(tool)\\n\\n\\n\\n  .main\\n    .viewport\\n      .overlay\\n\\n\\n\\n  .palette\\n    .color.current\\n    - each @palette, (color, index) ->\\n      .color(style=\\\"background-color: #{color}\\\")\\n        - on \\\"click\\\", ->\\n          - activeIndex index\\n        - on \\\"touchstart\\\", ->\\n          - activeIndex index\\n\\n  .layers\\n    .thumbnail\\n    Layers\\n    - layers = -> editor.layers().copy().reverse()\\n    - each layers, (layer, index) ->\\n      - activeClass = -> \\\"active\\\" if layer is editor.activeLayer()\\n      - hiddenClass = -> \\\"hidden\\\" if layer.hidden()\\n      .layer(class=activeClass class=hiddenClass)\\n        - on \\\"click\\\", ->\\n          - editor.activeLayer layer\\n        = layer.previewCanvas\\n        .eye\\n          - on \\\"click\\\", ->\\n            - layer.hidden !layer.hidden()\\n    %hr\\n    .up.icon\\n    .down.icon\\n    %hr\\n    .plus.icon\\n    .minus.icon\\n\\n  .actions\\n    - each @actions, (action) ->\\n      .action(style=\\\"background-image: url(#{action.iconUrl})\\\")\\n        - on \\\"click\\\", ->\\n          - action.perform()\\n        - on \\\"touchstart\\\", ->\\n          - action.perform()\\n\\n\\n\\n#modal\\n\", {compiler: CoffeeScript}))()",
      "type": "blob"
    },
    "test/editor": {
      "path": "test/editor",
      "content": "(function() {\n  require(\"../editor\");\n\n  describe(\"editor\", function() {\n    return it(\"should be radical\", function() {\n      return assert(true);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/editor.coffee",
      "type": "blob"
    },
    "tools": {
      "path": "tools",
      "content": "(function() {\n  var TOOLS, circle, line, line2, neighbors, rect, rectOutline, shapeTool, _ref;\n\n  _ref = require(\"./util\"), line = _ref.line, circle = _ref.circle, rect = _ref.rect, rectOutline = _ref.rectOutline;\n\n  line2 = function(start, end, fn) {\n    fn(start);\n    return line(start, end, fn);\n  };\n\n  neighbors = function(point) {\n    return [Point(point.x, point.y - 1), Point(point.x - 1, point.y), Point(point.x + 1, point.y), Point(point.x, point.y + 1)];\n  };\n\n  shapeTool = function(fn, icon) {\n    var start;\n    start = null;\n    return {\n      iconUrl: icon,\n      touch: function(_arg) {\n        var position;\n        position = _arg.position;\n        return start = position;\n      },\n      move: function(_arg) {\n        var editor, position;\n        editor = _arg.editor, position = _arg.position;\n        return editor.preview(function() {\n          return fn(start, position, editor.draw);\n        });\n      },\n      release: function(_arg) {\n        var editor, position;\n        position = _arg.position, editor = _arg.editor;\n        return fn(start, position, editor.draw);\n      }\n    };\n  };\n\n  TOOLS = {\n    pencil: (function() {\n      var previousPosition;\n      previousPosition = null;\n      return {\n        iconUrl: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA5klEQVQ4T5VTuw2DMBB9LmkZg54ZGCDpHYkJYBBYATcUSKnSwAy0iDFoKR0fDgiMDc5JLvy59969OzPchzSesP3+sLFgySoMweMYou/xmWe81VKx5d0CyCQBoghoGgiV/JombwDNzjkwjsAw/A8gswwgBWm6VPdU7L4laPa6BsrSyX6oxTBQ7munO1v9LgCv2ldCWxcWgDV4EDjZbQq0dDKv65ytuxokKdtWO08AagkhTr2/BiD2otBv8hyMurCbPHNaTQ8OBjJScZFs9eChTKMwB8byT5ajkwIC8E22AvyY7j7ZJugLVIZ5EV8R1SQAAAAASUVORK5CYII=\",\n        touch: function(_arg) {\n          var editor, position;\n          position = _arg.position, editor = _arg.editor;\n          editor.draw(position);\n          return previousPosition = position;\n        },\n        move: function(_arg) {\n          var editor, position;\n          editor = _arg.editor, position = _arg.position;\n          line(previousPosition, position, editor.draw);\n          return previousPosition = position;\n        },\n        release: function() {}\n      };\n    })(),\n    fill: {\n      iconUrl: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABCklEQVQ4T52TPRKCMBCFX0pbj+HY0tJKY+UB8AqchCuYXofCRs9gy3ADW1rKmLeQTIBEZ0wTwu779idZhfQygUml3FIGikPb8ux5MUDM+S9AWAIjRrNNZYDLdov7MEiqx80G576PQqIAJ75NgJMFXPMc6vlcQZYAI842unq/YQ4HoKrGho1iqLqeQWadZuSyLKG1FmeWwMjY7QDCJlAIcQAj4iyDfr1kp4gggVgb9nsPUkXhs1gBJBpX1wFtC20BrpmSjS0pDbD1h8uJeQu+pKaJAmgfy5icQzH/sani9HgkAWLnLTAi0+YeiFmu+QXwEH5EHpAx7EFwld+GybVjOVTJdzBrYOKwGqoP9IV4EbRDWfEAAAAASUVORK5CYII=\",\n      touch: function(_arg) {\n        var editor, height, index, position, queue, safetyHatch, targetIndex, width, _ref1;\n        position = _arg.position, editor = _arg.editor;\n        index = editor.activeIndex();\n        targetIndex = editor.getPixel(position).index;\n        if (targetIndex == null) {\n          return;\n        }\n        if (index === targetIndex) {\n          return;\n        }\n        queue = [position];\n        editor.draw(position);\n        _ref1 = editor.pixelExtent(), width = _ref1.width, height = _ref1.height;\n        safetyHatch = width * height;\n        while (queue.length && safetyHatch > 0) {\n          position = queue.pop();\n          neighbors(position).forEach(function(position) {\n            var _ref2;\n            if (((_ref2 = editor.getPixel(position)) != null ? _ref2.index : void 0) === targetIndex) {\n              safetyHatch -= 1;\n              editor.draw(position);\n              return queue.push(position);\n            }\n          });\n        }\n      },\n      move: function() {},\n      release: function() {}\n    },\n    circle: shapeTool(circle, \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAVklEQVQ4T2NkwA7+YxFmxKYUXRCmEZtirHLICkEKsNqCZjOKOpgGYjXDzIKrp4oBpNqO4gqQC0YNgAQJqeFA3WjESBw48gdWdVTNC8gWk50bCbgeUxoAvXwcEQnwKSYAAAAASUVORK5CYII=\"),\n    rect: shapeTool(rect, \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAK0lEQVQ4T2NkoBAwUqifYfAY8J9MrzDCvDBqAAPDMAgDMpMBwyBKymR7AQAp1wgR44q8HgAAAABJRU5ErkJggg==\"),\n    rectOutline: shapeTool(rectOutline, \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAN0lEQVQ4T2NkoBAwUqifgWoG/CfTJYwwF4AMINU1YD2jBgy7MCAnLcHTATmawXpITX0YFlFsAADRBBIRAZEL0wAAAABJRU5ErkJggg==\"),\n    line2: shapeTool(line2, \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAV0lEQVQ4T6XSyQ0AIAgEQOm/aIWHxoNzJTG+GASk9hnE+Z2P3FDMRBjZK0PI/fQyovVeQqzhpRFv+ikkWl+IRID8DRfJAC6SBUykAqhIFXgQBDgQFFjIAMAADxGQlO+iAAAAAElFTkSuQmCC\")\n  };\n\n  module.exports = function(I, self) {\n    if (I == null) {\n      I = {};\n    }\n    if (self == null) {\n      self = Core(I);\n    }\n    self.extend({\n      addTool: function(tool) {\n        return self.tools.push(tool);\n      },\n      activeTool: Observable(),\n      tools: Observable([])\n    });\n    Object.keys(TOOLS).forEach(function(name) {\n      return self.addTool(TOOLS[name]);\n    });\n    self.activeTool(self.tools()[0]);\n    return self;\n  };\n\n}).call(this);\n\n//# sourceURL=tools.coffee",
      "type": "blob"
    },
    "undo": {
      "path": "undo",
      "content": "(function() {\n  var CommandStack;\n\n  CommandStack = function(stack) {\n    var index;\n    if (stack == null) {\n      stack = [];\n    }\n    index = stack.length;\n    return {\n      execute: function(command) {\n        stack[index] = command;\n        command.execute();\n        index += 1;\n        stack.length = index;\n        return this;\n      },\n      undo: function() {\n        var command;\n        if (this.canUndo()) {\n          index -= 1;\n          command = stack[index];\n          command.undo();\n          return command;\n        }\n      },\n      redo: function() {\n        var command;\n        if (this.canRedo()) {\n          command = stack[index];\n          command.execute();\n          index += 1;\n          return command;\n        }\n      },\n      current: function() {\n        return stack[index - 1];\n      },\n      canUndo: function() {\n        return index > 0;\n      },\n      canRedo: function() {\n        return stack[index] != null;\n      },\n      stack: function() {\n        return stack.slice(0, index);\n      }\n    };\n  };\n\n  module.exports = CommandStack;\n\n  module.exports = function(I, self) {\n    var commandStack, dirty, lastClean, updateDirtyState;\n    if (I == null) {\n      I = {};\n    }\n    if (self == null) {\n      self = Core(I);\n    }\n    if (!self.on) {\n      self.include(Bindable);\n    }\n    commandStack = CommandStack();\n    lastClean = void 0;\n    dirty = function(newDirty) {\n      if (newDirty === false) {\n        lastClean = commandStack.current();\n        self.trigger('clean');\n        return self;\n      } else {\n        return lastClean !== commandStack.current();\n      }\n    };\n    updateDirtyState = function() {\n      if (dirty()) {\n        return self.trigger('dirty');\n      } else {\n        return self.trigger('clean');\n      }\n    };\n    self.on('save', function() {\n      return dirty(false);\n    });\n    self.extend({\n      history: function(newHistory) {\n        if (newHistory == null) {\n          newHistory = [];\n        }\n        if (arguments.length > 0) {\n          return commandStack = CommandStack(newHistory.map(self.Command.parse));\n        } else {\n          return commandStack.stack();\n        }\n      },\n      execute: function(command) {\n        commandStack.execute(command);\n        updateDirtyState();\n        return self;\n      },\n      undo: function() {\n        commandStack.undo();\n        updateDirtyState();\n        return self;\n      },\n      redo: function() {\n        commandStack.redo();\n        updateDirtyState();\n        return self;\n      }\n    });\n    return self;\n  };\n\n}).call(this);\n\n//# sourceURL=undo.coffee",
      "type": "blob"
    },
    "util": {
      "path": "util",
      "content": "(function() {\n  var Size, isObject;\n\n  global.Deferred = jQuery.Deferred;\n\n  isObject = function(object) {\n    return Object.prototype.toString.call(object) === \"[object Object]\";\n  };\n\n  Size = function(width, height) {\n    var _ref;\n    if (isObject(width)) {\n      _ref = width, width = _ref.width, height = _ref.height;\n    }\n    return {\n      width: width,\n      height: height,\n      __proto__: Size.prototype\n    };\n  };\n\n  Size.prototype = {\n    scale: function(scalar) {\n      return Size(this.width * scalar, this.height * scalar);\n    },\n    toString: function() {\n      return \"Size(\" + this.width + \", \" + this.height + \")\";\n    },\n    max: function(otherSize) {\n      return Size(Math.max(this.width, otherSize.width), Math.max(this.height, otherSize.height));\n    },\n    each: function(iterator) {\n      var _i, _ref, _results;\n      return (function() {\n        _results = [];\n        for (var _i = 0, _ref = this.height; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }\n        return _results;\n      }).apply(this).forEach(function(y) {\n        var _i, _ref, _results;\n        return (function() {\n          _results = [];\n          for (var _i = 0, _ref = this.width; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }\n          return _results;\n        }).apply(this).forEach(function(x) {\n          return iterator(x, y);\n        });\n      });\n    }\n  };\n\n  Point.prototype.scale = function(scalar) {\n    if (isObject(scalar)) {\n      return Point(this.x * scalar.width, this.y * scalar.height);\n    } else {\n      return Point(this.x * scalar, this.y * scalar);\n    }\n  };\n\n  module.exports = {\n    Size: Size,\n    Grid: function(width, height, defaultValue) {\n      var generateValue, grid, self, _i, _results;\n      generateValue = function(x, y) {\n        if (typeof defaultValue === \"function\") {\n          return defaultValue(x, y);\n        } else {\n          return defaultValue;\n        }\n      };\n      grid = (function() {\n        _results = [];\n        for (var _i = 0; 0 <= height ? _i < height : _i > height; 0 <= height ? _i++ : _i--){ _results.push(_i); }\n        return _results;\n      }).apply(this).map(function(y) {\n        var _i, _results;\n        return (function() {\n          _results = [];\n          for (var _i = 0; 0 <= width ? _i < width : _i > width; 0 <= width ? _i++ : _i--){ _results.push(_i); }\n          return _results;\n        }).apply(this).map(function(x) {\n          return generateValue(x, y);\n        });\n      });\n      self = {\n        contract: function(x, y) {\n          height -= y;\n          width -= x;\n          grid.length = height;\n          grid.forEach(function(row) {\n            return row.length = width;\n          });\n          return self;\n        },\n        copy: function() {\n          return Grid(width, height, self.get);\n        },\n        get: function(x, y) {\n          if (x < 0 || x >= width) {\n            return;\n          }\n          if (y < 0 || y >= height) {\n            return;\n          }\n          return grid[y][x];\n        },\n        set: function(x, y, value) {\n          if (x < 0 || x >= width) {\n            return;\n          }\n          if (y < 0 || y >= height) {\n            return;\n          }\n          return grid[y][x] = value;\n        },\n        each: function(iterator) {\n          grid.forEach(function(row, y) {\n            return row.forEach(function(value, x) {\n              return iterator(value, x, y);\n            });\n          });\n          return self;\n        },\n        expand: function(x, y, defaultValue) {\n          var newRows, _j, _results1;\n          newRows = (function() {\n            _results1 = [];\n            for (var _j = 0; 0 <= y ? _j < y : _j > y; 0 <= y ? _j++ : _j--){ _results1.push(_j); }\n            return _results1;\n          }).apply(this).map(function(y) {\n            var _j, _results1;\n            return (function() {\n              _results1 = [];\n              for (var _j = 0; 0 <= width ? _j < width : _j > width; 0 <= width ? _j++ : _j--){ _results1.push(_j); }\n              return _results1;\n            }).apply(this).map(function(x) {\n              if (typeof defaultValue === \"function\") {\n                return defaultValue(x, y + height);\n              } else {\n                return defaultValue;\n              }\n            });\n          });\n          grid = grid.concat(newRows);\n          grid = grid.map(function(row, y) {\n            var _k, _results2;\n            return row.concat((function() {\n              _results2 = [];\n              for (var _k = 0; 0 <= x ? _k < x : _k > x; 0 <= x ? _k++ : _k--){ _results2.push(_k); }\n              return _results2;\n            }).apply(this).map(function(x) {\n              if (typeof defaultValue === \"function\") {\n                return defaultValue(width + x, y);\n              } else {\n                return defaultValue;\n              }\n            }));\n          });\n          height = y + height;\n          width = x + width;\n          return self;\n        },\n        toArray: function() {\n          return grid.reduce(function(a, b) {\n            return a.concat(b);\n          }, []);\n        }\n      };\n      return self;\n    },\n    line: function(p0, p1, iterator) {\n      var dx, dy, e2, err, sx, sy, x0, x1, y0, y1, _results;\n      x0 = p0.x, y0 = p0.y;\n      x1 = p1.x, y1 = p1.y;\n      dx = (x1 - x0).abs();\n      dy = (y1 - y0).abs();\n      sx = (x1 - x0).sign();\n      sy = (y1 - y0).sign();\n      err = dx - dy;\n      _results = [];\n      while (!(x0 === x1 && y0 === y1)) {\n        e2 = 2 * err;\n        if (e2 > -dy) {\n          err -= dy;\n          x0 += sx;\n        }\n        if (e2 < dx) {\n          err += dx;\n          y0 += sy;\n        }\n        _results.push(iterator({\n          x: x0,\n          y: y0\n        }));\n      }\n      return _results;\n    },\n    rect: function(start, end, iterator) {\n      var _i, _ref, _ref1, _results;\n      return (function() {\n        _results = [];\n        for (var _i = _ref = start.y, _ref1 = end.y; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }\n        return _results;\n      }).apply(this).forEach(function(y) {\n        var _i, _ref, _ref1, _results;\n        return (function() {\n          _results = [];\n          for (var _i = _ref = start.x, _ref1 = end.x; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }\n          return _results;\n        }).apply(this).forEach(function(x) {\n          return iterator({\n            x: x,\n            y: y\n          });\n        });\n      });\n    },\n    rectOutline: function(start, end, iterator) {\n      var _i, _ref, _ref1, _results;\n      return (function() {\n        _results = [];\n        for (var _i = _ref = start.y, _ref1 = end.y; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }\n        return _results;\n      }).apply(this).forEach(function(y) {\n        var _i, _ref, _ref1, _results;\n        if (y === start.y || y === end.y) {\n          return (function() {\n            _results = [];\n            for (var _i = _ref = start.x, _ref1 = end.x; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }\n            return _results;\n          }).apply(this).forEach(function(x) {\n            return iterator({\n              x: x,\n              y: y\n            });\n          });\n        } else {\n          iterator({\n            x: start.x,\n            y: y\n          });\n          return iterator({\n            x: end.x,\n            y: y\n          });\n        }\n      });\n    },\n    circle: function(start, endPoint, iterator) {\n      var center, ddFx, ddFy, extent, f, radius, x, x0, x1, y, y0, y1, _results;\n      center = Point.interpolate(start, endPoint, 0.5).floor();\n      x0 = center.x, y0 = center.y;\n      x1 = endPoint.x, y1 = endPoint.y;\n      extent = endPoint.subtract(start).scale(0.5).abs().floor();\n      radius = Math.min(extent.x, extent.y);\n      f = 1 - radius;\n      ddFx = 1;\n      ddFy = -2 * radius;\n      x = 0;\n      y = radius;\n      iterator(Point(x0, y0 + radius));\n      iterator(Point(x0, y0 - radius));\n      iterator(Point(x0 + radius, y0));\n      iterator(Point(x0 - radius, y0));\n      _results = [];\n      while (x < y) {\n        if (f > 0) {\n          y--;\n          ddFy += 2;\n          f += ddFy;\n        }\n        x++;\n        ddFx += 2;\n        f += ddFx;\n        iterator(Point(x0 + x, y0 + y));\n        iterator(Point(x0 - x, y0 + y));\n        iterator(Point(x0 + x, y0 - y));\n        iterator(Point(x0 - x, y0 - y));\n        iterator(Point(x0 + y, y0 + x));\n        iterator(Point(x0 - y, y0 + x));\n        iterator(Point(x0 + y, y0 - x));\n        _results.push(iterator(Point(x0 - y, y0 - x)));\n      }\n      return _results;\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=util.coffee",
      "type": "blob"
    }
  },
  "entryPoint": "editor",
  "dependencies": {
    "appcache": {
      "version": "0.1.0",
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "appcache\n========\n\nHTML5 AppCache Helpers\n",
          "type": "blob"
        },
        "main.coffee.md": {
          "path": "main.coffee.md",
          "mode": "100644",
          "content": "App Cache\n=========\n\nSome helpers for working with HTML5 application cache.\n\nhttp://www.html5rocks.com/en/tutorials/appcache/beginner/\n\n    applicationCache = window.applicationCache\n\n    applicationCache.addEventListener 'updateready', (e) ->\n      if applicationCache.status is applicationCache.UPDATEREADY\n        # Browser downloaded a new app cache.\n        if confirm('A new version of this site is available. Load it?')\n          window.location.reload()\n    , false\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.1.0\"\nentryPoint: \"main\"\n",
          "type": "blob"
        }
      },
      "distribution": {
        "main": {
          "path": "main",
          "content": "(function() {\n  var applicationCache;\n\n  applicationCache = window.applicationCache;\n\n  applicationCache.addEventListener('updateready', function(e) {\n    if (applicationCache.status === applicationCache.UPDATEREADY) {\n      if (confirm('A new version of this site is available. Load it?')) {\n        return window.location.reload();\n      }\n    }\n  }, false);\n\n}).call(this);\n\n//# sourceURL=main.coffee",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.1.0\",\"entryPoint\":\"main\"};",
          "type": "blob"
        }
      },
      "entryPoint": "main",
      "dependencies": {},
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "repository": {
        "id": 14539483,
        "name": "appcache",
        "full_name": "STRd6/appcache",
        "owner": {
          "login": "STRd6",
          "id": 18894,
          "avatar_url": "https://2.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png&r=x",
          "gravatar_id": "33117162fff8a9cf50544a604f60c045",
          "url": "https://api.github.com/users/STRd6",
          "html_url": "https://github.com/STRd6",
          "followers_url": "https://api.github.com/users/STRd6/followers",
          "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
          "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
          "organizations_url": "https://api.github.com/users/STRd6/orgs",
          "repos_url": "https://api.github.com/users/STRd6/repos",
          "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
          "received_events_url": "https://api.github.com/users/STRd6/received_events",
          "type": "User",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/STRd6/appcache",
        "description": "HTML5 AppCache Helpers",
        "fork": false,
        "url": "https://api.github.com/repos/STRd6/appcache",
        "forks_url": "https://api.github.com/repos/STRd6/appcache/forks",
        "keys_url": "https://api.github.com/repos/STRd6/appcache/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/STRd6/appcache/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/STRd6/appcache/teams",
        "hooks_url": "https://api.github.com/repos/STRd6/appcache/hooks",
        "issue_events_url": "https://api.github.com/repos/STRd6/appcache/issues/events{/number}",
        "events_url": "https://api.github.com/repos/STRd6/appcache/events",
        "assignees_url": "https://api.github.com/repos/STRd6/appcache/assignees{/user}",
        "branches_url": "https://api.github.com/repos/STRd6/appcache/branches{/branch}",
        "tags_url": "https://api.github.com/repos/STRd6/appcache/tags",
        "blobs_url": "https://api.github.com/repos/STRd6/appcache/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/STRd6/appcache/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/STRd6/appcache/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/STRd6/appcache/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/STRd6/appcache/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/STRd6/appcache/languages",
        "stargazers_url": "https://api.github.com/repos/STRd6/appcache/stargazers",
        "contributors_url": "https://api.github.com/repos/STRd6/appcache/contributors",
        "subscribers_url": "https://api.github.com/repos/STRd6/appcache/subscribers",
        "subscription_url": "https://api.github.com/repos/STRd6/appcache/subscription",
        "commits_url": "https://api.github.com/repos/STRd6/appcache/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/STRd6/appcache/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/STRd6/appcache/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/STRd6/appcache/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/STRd6/appcache/contents/{+path}",
        "compare_url": "https://api.github.com/repos/STRd6/appcache/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/STRd6/appcache/merges",
        "archive_url": "https://api.github.com/repos/STRd6/appcache/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/STRd6/appcache/downloads",
        "issues_url": "https://api.github.com/repos/STRd6/appcache/issues{/number}",
        "pulls_url": "https://api.github.com/repos/STRd6/appcache/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/STRd6/appcache/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/STRd6/appcache/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/STRd6/appcache/labels{/name}",
        "releases_url": "https://api.github.com/repos/STRd6/appcache/releases{/id}",
        "created_at": "2013-11-19T22:09:16Z",
        "updated_at": "2013-11-19T22:09:16Z",
        "pushed_at": "2013-11-19T22:09:16Z",
        "git_url": "git://github.com/STRd6/appcache.git",
        "ssh_url": "git@github.com:STRd6/appcache.git",
        "clone_url": "https://github.com/STRd6/appcache.git",
        "svn_url": "https://github.com/STRd6/appcache",
        "homepage": null,
        "size": 0,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": null,
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "network_count": 0,
        "subscribers_count": 1,
        "branch": "v0.1.0",
        "defaultBranch": "master"
      }
    },
    "compression": {
      "version": "1.3.3",
      "source": {
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "lz-string\n=========\nLZ-based compression algorithm for JavaScript\n\n## Home page\nHome page for this program with examples, documentation and a live demo: http://pieroxy.net/blog/pages/lz-string/index.html\n",
          "type": "blob"
        },
        "main.js": {
          "path": "main.js",
          "mode": "100644",
          "content": "// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>\n// This work is free. You can redistribute it and/or modify it\n// under the terms of the WTFPL, Version 2\n// For more information see LICENSE.txt or http://www.wtfpl.net/\n//\n// For more information, the home page:\n// http://pieroxy.net/blog/pages/lz-string/testing.html\n//\n// LZ-based compression algorithm, version 1.3.3\nvar LZString = {\n  \n  \n  // private property\n  _keyStr : \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\",\n  _f : String.fromCharCode,\n  \n  compressToBase64 : function (input) {\n    if (input == null) return \"\";\n    var output = \"\";\n    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;\n    var i = 0;\n    \n    input = LZString.compress(input);\n    \n    while (i < input.length*2) {\n      \n      if (i%2==0) {\n        chr1 = input.charCodeAt(i/2) >> 8;\n        chr2 = input.charCodeAt(i/2) & 255;\n        if (i/2+1 < input.length) \n          chr3 = input.charCodeAt(i/2+1) >> 8;\n        else \n          chr3 = NaN;\n      } else {\n        chr1 = input.charCodeAt((i-1)/2) & 255;\n        if ((i+1)/2 < input.length) {\n          chr2 = input.charCodeAt((i+1)/2) >> 8;\n          chr3 = input.charCodeAt((i+1)/2) & 255;\n        } else \n          chr2=chr3=NaN;\n      }\n      i+=3;\n      \n      enc1 = chr1 >> 2;\n      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);\n      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);\n      enc4 = chr3 & 63;\n      \n      if (isNaN(chr2)) {\n        enc3 = enc4 = 64;\n      } else if (isNaN(chr3)) {\n        enc4 = 64;\n      }\n      \n      output = output +\n        LZString._keyStr.charAt(enc1) + LZString._keyStr.charAt(enc2) +\n          LZString._keyStr.charAt(enc3) + LZString._keyStr.charAt(enc4);\n      \n    }\n    \n    return output;\n  },\n  \n  decompressFromBase64 : function (input) {\n    if (input == null) return \"\";\n    var output = \"\",\n        ol = 0, \n        output_,\n        chr1, chr2, chr3,\n        enc1, enc2, enc3, enc4,\n        i = 0, f=LZString._f;\n    \n    input = input.replace(/[^A-Za-z0-9\\+\\/\\=]/g, \"\");\n    \n    while (i < input.length) {\n      \n      enc1 = LZString._keyStr.indexOf(input.charAt(i++));\n      enc2 = LZString._keyStr.indexOf(input.charAt(i++));\n      enc3 = LZString._keyStr.indexOf(input.charAt(i++));\n      enc4 = LZString._keyStr.indexOf(input.charAt(i++));\n      \n      chr1 = (enc1 << 2) | (enc2 >> 4);\n      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);\n      chr3 = ((enc3 & 3) << 6) | enc4;\n      \n      if (ol%2==0) {\n        output_ = chr1 << 8;\n        \n        if (enc3 != 64) {\n          output += f(output_ | chr2);\n        }\n        if (enc4 != 64) {\n          output_ = chr3 << 8;\n        }\n      } else {\n        output = output + f(output_ | chr1);\n        \n        if (enc3 != 64) {\n          output_ = chr2 << 8;\n        }\n        if (enc4 != 64) {\n          output += f(output_ | chr3);\n        }\n      }\n      ol+=3;\n    }\n    \n    return LZString.decompress(output);\n    \n  },\n\n  compressToUTF16 : function (input) {\n    if (input == null) return \"\";\n    var output = \"\",\n        i,c,\n        current,\n        status = 0,\n        f = LZString._f;\n    \n    input = LZString.compress(input);\n    \n    for (i=0 ; i<input.length ; i++) {\n      c = input.charCodeAt(i);\n      switch (status++) {\n        case 0:\n          output += f((c >> 1)+32);\n          current = (c & 1) << 14;\n          break;\n        case 1:\n          output += f((current + (c >> 2))+32);\n          current = (c & 3) << 13;\n          break;\n        case 2:\n          output += f((current + (c >> 3))+32);\n          current = (c & 7) << 12;\n          break;\n        case 3:\n          output += f((current + (c >> 4))+32);\n          current = (c & 15) << 11;\n          break;\n        case 4:\n          output += f((current + (c >> 5))+32);\n          current = (c & 31) << 10;\n          break;\n        case 5:\n          output += f((current + (c >> 6))+32);\n          current = (c & 63) << 9;\n          break;\n        case 6:\n          output += f((current + (c >> 7))+32);\n          current = (c & 127) << 8;\n          break;\n        case 7:\n          output += f((current + (c >> 8))+32);\n          current = (c & 255) << 7;\n          break;\n        case 8:\n          output += f((current + (c >> 9))+32);\n          current = (c & 511) << 6;\n          break;\n        case 9:\n          output += f((current + (c >> 10))+32);\n          current = (c & 1023) << 5;\n          break;\n        case 10:\n          output += f((current + (c >> 11))+32);\n          current = (c & 2047) << 4;\n          break;\n        case 11:\n          output += f((current + (c >> 12))+32);\n          current = (c & 4095) << 3;\n          break;\n        case 12:\n          output += f((current + (c >> 13))+32);\n          current = (c & 8191) << 2;\n          break;\n        case 13:\n          output += f((current + (c >> 14))+32);\n          current = (c & 16383) << 1;\n          break;\n        case 14:\n          output += f((current + (c >> 15))+32, (c & 32767)+32);\n          status = 0;\n          break;\n      }\n    }\n    \n    return output + f(current + 32);\n  },\n  \n\n  decompressFromUTF16 : function (input) {\n    if (input == null) return \"\";\n    var output = \"\",\n        current,c,\n        status=0,\n        i = 0,\n        f = LZString._f;\n    \n    while (i < input.length) {\n      c = input.charCodeAt(i) - 32;\n      \n      switch (status++) {\n        case 0:\n          current = c << 1;\n          break;\n        case 1:\n          output += f(current | (c >> 14));\n          current = (c&16383) << 2;\n          break;\n        case 2:\n          output += f(current | (c >> 13));\n          current = (c&8191) << 3;\n          break;\n        case 3:\n          output += f(current | (c >> 12));\n          current = (c&4095) << 4;\n          break;\n        case 4:\n          output += f(current | (c >> 11));\n          current = (c&2047) << 5;\n          break;\n        case 5:\n          output += f(current | (c >> 10));\n          current = (c&1023) << 6;\n          break;\n        case 6:\n          output += f(current | (c >> 9));\n          current = (c&511) << 7;\n          break;\n        case 7:\n          output += f(current | (c >> 8));\n          current = (c&255) << 8;\n          break;\n        case 8:\n          output += f(current | (c >> 7));\n          current = (c&127) << 9;\n          break;\n        case 9:\n          output += f(current | (c >> 6));\n          current = (c&63) << 10;\n          break;\n        case 10:\n          output += f(current | (c >> 5));\n          current = (c&31) << 11;\n          break;\n        case 11:\n          output += f(current | (c >> 4));\n          current = (c&15) << 12;\n          break;\n        case 12:\n          output += f(current | (c >> 3));\n          current = (c&7) << 13;\n          break;\n        case 13:\n          output += f(current | (c >> 2));\n          current = (c&3) << 14;\n          break;\n        case 14:\n          output += f(current | (c >> 1));\n          current = (c&1) << 15;\n          break;\n        case 15:\n          output += f(current | c);\n          status=0;\n          break;\n      }\n      \n      \n      i++;\n    }\n    \n    return LZString.decompress(output);\n    //return output;\n    \n  },\n\n\n  \n  compress: function (uncompressed) {\n    if (uncompressed == null) return \"\";\n    var i, value,\n        context_dictionary= {},\n        context_dictionaryToCreate= {},\n        context_c=\"\",\n        context_wc=\"\",\n        context_w=\"\",\n        context_enlargeIn= 2, // Compensate for the first entry which should not count\n        context_dictSize= 3,\n        context_numBits= 2,\n        context_data_string=\"\", \n        context_data_val=0, \n        context_data_position=0,\n        ii,\n        f=LZString._f;\n    \n    for (ii = 0; ii < uncompressed.length; ii += 1) {\n      context_c = uncompressed.charAt(ii);\n      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {\n        context_dictionary[context_c] = context_dictSize++;\n        context_dictionaryToCreate[context_c] = true;\n      }\n      \n      context_wc = context_w + context_c;\n      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {\n        context_w = context_wc;\n      } else {\n        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {\n          if (context_w.charCodeAt(0)<256) {\n            for (i=0 ; i<context_numBits ; i++) {\n              context_data_val = (context_data_val << 1);\n              if (context_data_position == 15) {\n                context_data_position = 0;\n                context_data_string += f(context_data_val);\n                context_data_val = 0;\n              } else {\n                context_data_position++;\n              }\n            }\n            value = context_w.charCodeAt(0);\n            for (i=0 ; i<8 ; i++) {\n              context_data_val = (context_data_val << 1) | (value&1);\n              if (context_data_position == 15) {\n                context_data_position = 0;\n                context_data_string += f(context_data_val);\n                context_data_val = 0;\n              } else {\n                context_data_position++;\n              }\n              value = value >> 1;\n            }\n          } else {\n            value = 1;\n            for (i=0 ; i<context_numBits ; i++) {\n              context_data_val = (context_data_val << 1) | value;\n              if (context_data_position == 15) {\n                context_data_position = 0;\n                context_data_string += f(context_data_val);\n                context_data_val = 0;\n              } else {\n                context_data_position++;\n              }\n              value = 0;\n            }\n            value = context_w.charCodeAt(0);\n            for (i=0 ; i<16 ; i++) {\n              context_data_val = (context_data_val << 1) | (value&1);\n              if (context_data_position == 15) {\n                context_data_position = 0;\n                context_data_string += f(context_data_val);\n                context_data_val = 0;\n              } else {\n                context_data_position++;\n              }\n              value = value >> 1;\n            }\n          }\n          context_enlargeIn--;\n          if (context_enlargeIn == 0) {\n            context_enlargeIn = Math.pow(2, context_numBits);\n            context_numBits++;\n          }\n          delete context_dictionaryToCreate[context_w];\n        } else {\n          value = context_dictionary[context_w];\n          for (i=0 ; i<context_numBits ; i++) {\n            context_data_val = (context_data_val << 1) | (value&1);\n            if (context_data_position == 15) {\n              context_data_position = 0;\n              context_data_string += f(context_data_val);\n              context_data_val = 0;\n            } else {\n              context_data_position++;\n            }\n            value = value >> 1;\n          }\n          \n          \n        }\n        context_enlargeIn--;\n        if (context_enlargeIn == 0) {\n          context_enlargeIn = Math.pow(2, context_numBits);\n          context_numBits++;\n        }\n        // Add wc to the dictionary.\n        context_dictionary[context_wc] = context_dictSize++;\n        context_w = String(context_c);\n      }\n    }\n    \n    // Output the code for w.\n    if (context_w !== \"\") {\n      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {\n        if (context_w.charCodeAt(0)<256) {\n          for (i=0 ; i<context_numBits ; i++) {\n            context_data_val = (context_data_val << 1);\n            if (context_data_position == 15) {\n              context_data_position = 0;\n              context_data_string += f(context_data_val);\n              context_data_val = 0;\n            } else {\n              context_data_position++;\n            }\n          }\n          value = context_w.charCodeAt(0);\n          for (i=0 ; i<8 ; i++) {\n            context_data_val = (context_data_val << 1) | (value&1);\n            if (context_data_position == 15) {\n              context_data_position = 0;\n              context_data_string += f(context_data_val);\n              context_data_val = 0;\n            } else {\n              context_data_position++;\n            }\n            value = value >> 1;\n          }\n        } else {\n          value = 1;\n          for (i=0 ; i<context_numBits ; i++) {\n            context_data_val = (context_data_val << 1) | value;\n            if (context_data_position == 15) {\n              context_data_position = 0;\n              context_data_string += f(context_data_val);\n              context_data_val = 0;\n            } else {\n              context_data_position++;\n            }\n            value = 0;\n          }\n          value = context_w.charCodeAt(0);\n          for (i=0 ; i<16 ; i++) {\n            context_data_val = (context_data_val << 1) | (value&1);\n            if (context_data_position == 15) {\n              context_data_position = 0;\n              context_data_string += f(context_data_val);\n              context_data_val = 0;\n            } else {\n              context_data_position++;\n            }\n            value = value >> 1;\n          }\n        }\n        context_enlargeIn--;\n        if (context_enlargeIn == 0) {\n          context_enlargeIn = Math.pow(2, context_numBits);\n          context_numBits++;\n        }\n        delete context_dictionaryToCreate[context_w];\n      } else {\n        value = context_dictionary[context_w];\n        for (i=0 ; i<context_numBits ; i++) {\n          context_data_val = (context_data_val << 1) | (value&1);\n          if (context_data_position == 15) {\n            context_data_position = 0;\n            context_data_string += f(context_data_val);\n            context_data_val = 0;\n          } else {\n            context_data_position++;\n          }\n          value = value >> 1;\n        }\n        \n        \n      }\n      context_enlargeIn--;\n      if (context_enlargeIn == 0) {\n        context_enlargeIn = Math.pow(2, context_numBits);\n        context_numBits++;\n      }\n    }\n    \n    // Mark the end of the stream\n    value = 2;\n    for (i=0 ; i<context_numBits ; i++) {\n      context_data_val = (context_data_val << 1) | (value&1);\n      if (context_data_position == 15) {\n        context_data_position = 0;\n        context_data_string += f(context_data_val);\n        context_data_val = 0;\n      } else {\n        context_data_position++;\n      }\n      value = value >> 1;\n    }\n    \n    // Flush the last char\n    while (true) {\n      context_data_val = (context_data_val << 1);\n      if (context_data_position == 15) {\n        context_data_string += f(context_data_val);\n        break;\n      }\n      else context_data_position++;\n    }\n    return context_data_string;\n  },\n  \n  decompress: function (compressed) {\n    if (compressed == null) return \"\";\n    if (compressed == \"\") return null;\n    var dictionary = [],\n        next,\n        enlargeIn = 4,\n        dictSize = 4,\n        numBits = 3,\n        entry = \"\",\n        result = \"\",\n        i,\n        w,\n        bits, resb, maxpower, power,\n        c,\n        f = LZString._f,\n        data = {string:compressed, val:compressed.charCodeAt(0), position:32768, index:1};\n    \n    for (i = 0; i < 3; i += 1) {\n      dictionary[i] = i;\n    }\n    \n    bits = 0;\n    maxpower = Math.pow(2,2);\n    power=1;\n    while (power!=maxpower) {\n      resb = data.val & data.position;\n      data.position >>= 1;\n      if (data.position == 0) {\n        data.position = 32768;\n        data.val = data.string.charCodeAt(data.index++);\n      }\n      bits |= (resb>0 ? 1 : 0) * power;\n      power <<= 1;\n    }\n    \n    switch (next = bits) {\n      case 0: \n          bits = 0;\n          maxpower = Math.pow(2,8);\n          power=1;\n          while (power!=maxpower) {\n            resb = data.val & data.position;\n            data.position >>= 1;\n            if (data.position == 0) {\n              data.position = 32768;\n              data.val = data.string.charCodeAt(data.index++);\n            }\n            bits |= (resb>0 ? 1 : 0) * power;\n            power <<= 1;\n          }\n        c = f(bits);\n        break;\n      case 1: \n          bits = 0;\n          maxpower = Math.pow(2,16);\n          power=1;\n          while (power!=maxpower) {\n            resb = data.val & data.position;\n            data.position >>= 1;\n            if (data.position == 0) {\n              data.position = 32768;\n              data.val = data.string.charCodeAt(data.index++);\n            }\n            bits |= (resb>0 ? 1 : 0) * power;\n            power <<= 1;\n          }\n        c = f(bits);\n        break;\n      case 2: \n        return \"\";\n    }\n    dictionary[3] = c;\n    w = result = c;\n    while (true) {\n      if (data.index > data.string.length) {\n        return \"\";\n      }\n      \n      bits = 0;\n      maxpower = Math.pow(2,numBits);\n      power=1;\n      while (power!=maxpower) {\n        resb = data.val & data.position;\n        data.position >>= 1;\n        if (data.position == 0) {\n          data.position = 32768;\n          data.val = data.string.charCodeAt(data.index++);\n        }\n        bits |= (resb>0 ? 1 : 0) * power;\n        power <<= 1;\n      }\n\n      switch (c = bits) {\n        case 0: \n          bits = 0;\n          maxpower = Math.pow(2,8);\n          power=1;\n          while (power!=maxpower) {\n            resb = data.val & data.position;\n            data.position >>= 1;\n            if (data.position == 0) {\n              data.position = 32768;\n              data.val = data.string.charCodeAt(data.index++);\n            }\n            bits |= (resb>0 ? 1 : 0) * power;\n            power <<= 1;\n          }\n\n          dictionary[dictSize++] = f(bits);\n          c = dictSize-1;\n          enlargeIn--;\n          break;\n        case 1: \n          bits = 0;\n          maxpower = Math.pow(2,16);\n          power=1;\n          while (power!=maxpower) {\n            resb = data.val & data.position;\n            data.position >>= 1;\n            if (data.position == 0) {\n              data.position = 32768;\n              data.val = data.string.charCodeAt(data.index++);\n            }\n            bits |= (resb>0 ? 1 : 0) * power;\n            power <<= 1;\n          }\n          dictionary[dictSize++] = f(bits);\n          c = dictSize-1;\n          enlargeIn--;\n          break;\n        case 2: \n          return result;\n      }\n      \n      if (enlargeIn == 0) {\n        enlargeIn = Math.pow(2, numBits);\n        numBits++;\n      }\n      \n      if (dictionary[c]) {\n        entry = dictionary[c];\n      } else {\n        if (c === dictSize) {\n          entry = w + w.charAt(0);\n        } else {\n          return null;\n        }\n      }\n      result += entry;\n      \n      // Add w+entry[0] to the dictionary.\n      dictionary[dictSize++] = w + entry.charAt(0);\n      enlargeIn--;\n      \n      w = entry;\n      \n      if (enlargeIn == 0) {\n        enlargeIn = Math.pow(2, numBits);\n        numBits++;\n      }\n      \n    }\n  }\n};\n\nif( typeof module !== 'undefined' && module != null ) {\n  module.exports = LZString\n}\n",
          "type": "blob"
        },
        "tests/lz-string-spec.js": {
          "path": "tests/lz-string-spec.js",
          "mode": "100644",
          "content": "LZString = require(\"../main\")\n\ndescribe(\"LZString\", function(compress, decompress) {\n    it('compresses and decompresses  \"Hello world!\"', function() {\n        var compressed = compress('Hello world!');\n        expect(compressed).not.toBe('Hello world!');\n        var decompressed = decompress(compressed);\n        expect(decompressed).toBe('Hello world!');\n    });\n\n    it('compresses and decompresses null', function() {\n        var compressed = compress(null);\n        expect(compressed).toBe('');\n        expect(typeof compressed).toBe(typeof '');\n        var decompressed = decompress(compressed);\n        expect(decompressed).toBe(null);\n    });\n\n    it('compresses and decompresses undefined', function() {\n        var compressed = compress();\n        expect(compressed).toBe('');\n        expect(typeof compressed).toBe(typeof '');\n        var decompressed = decompress(compressed);\n        expect(decompressed).toBe(null);\n    });\n\n    it('decompresses null', function() {\n        var decompressed = decompress(null);\n        expect(decompressed).toBe('');\n    });\n\n    it('compresses and decompresses an empty string', function() {\n        var compressed = compress('');\n        expect(compressed).not.toBe('');\n        expect(typeof compressed).toBe(typeof '');\n        var decompressed = decompress(compressed);\n        expect(decompressed).toBe('');\n    });\n\n    it('compresses and decompresses all printable UTF-16 characters',\n        function() {\n        var testString = '';\n        var i;\n        for (i = 32; i < 127; ++i) {\n            testString += String.fromCharCode(i);\n        }\n        for (i = 128 + 32; i < 55296; ++i) {\n            testString += String.fromCharCode(i);\n        }\n        for (i = 63744; i < 65536; ++i) {\n            testString += String.fromCharCode(i);\n        }\n        //console.log(testString);\n        var compressed = compress(testString);\n        expect(compressed).not.toBe(testString);\n        var decompressed = decompress(compressed);\n        expect(decompressed).toBe(testString);\n    });\n\n    it('compresses and decompresses a string that repeats',\n        function() {\n        var testString = 'aaaaabaaaaacaaaaadaaaaaeaaaaa';\n        var compressed = compress(testString);\n        expect(compressed).not.toBe(testString);\n        expect(compressed.length).toBeLessThan(testString.length);\n        var decompressed = decompress(compressed);\n        expect(decompressed).toBe(testString);\n    });\n\n    it('compresses and decompresses a long string',\n        function() {\n        var testString = '';\n        var i;\n        for (i=0 ; i<1000 ; i++)\n          testString += Math.random() + \" \";\n            \n        var compressed = compress(testString);\n        expect(compressed).not.toBe(testString);\n        expect(compressed.length).toBeLessThan(testString.length);\n        var decompressed = decompress(compressed);\n        expect(decompressed).toBe(testString);\n    });\n});\n\ndescribe('LZString', function() {\n    it('base 64', function() {\n        compressionTests(LZString.compressToBase64,\n                         LZString.decompressFromBase64);\n    });\n\n    it('UTF-16', function() {\n        compressionTests(LZString.compressToUTF16,\n                         LZString.decompressFromUTF16);\n    });\n});\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"1.3.3\"\nremoteDependencies: [\n  \"http://strd6.github.io/require/v0.2.2.js\"\n]\n",
          "type": "blob"
        },
        "test/main.coffee": {
          "path": "test/main.coffee",
          "mode": "100644",
          "content": "{compress, decompress} = LZString = require(\"../main\")\n\n# TODO: Test other compression methods\n\ndescribe \"LZString\", ->\n  it \"compresses and decompresses \\\"Hello world!\\\"\", ->\n    compressed = compress(\"Hello world!\")\n    decompressed = decompress(compressed)\n\n    assert.equal decompressed, \"Hello world!\"\n\n  it \"compresses and decompresses null\", ->\n    compressed = compress(null)\n    assert.equal compressed, \"\"\n\n    decompressed = decompress(compressed)\n    assert.equal decompressed, null\n\n  it \"compresses and decompresses an empty string\", ->\n    compressed = compress(\"\")\n\n    decompressed = decompress(compressed)\n    assert.equal decompressed, \"\"\n\n  it \"compresses and decompresses all printable UTF-16 characters\", ->\n    testString = \"\"\n    i = undefined\n    i = 32\n    while i < 127\n      testString += String.fromCharCode(i)\n      ++i\n    i = 128 + 32\n    while i < 55296\n      testString += String.fromCharCode(i)\n      ++i\n    i = 63744\n    while i < 65536\n      testString += String.fromCharCode(i)\n      ++i\n\n    compressed = compress(testString)\n\n    decompressed = decompress(compressed)\n    assert.equal decompressed, testString\n\n  it \"compresses and decompresses a string that repeats\", ->\n    testString = \"aaaaabaaaaacaaaaadaaaaaeaaaaa\"\n    compressed = compress(testString)\n\n    assert compressed.length < testString.length\n\n    decompressed = decompress(compressed)\n    assert.equal decompressed, testString\n\n  it \"compresses and decompresses a long string\", ->\n    testString = \"\"\n\n    i = 0\n    while i < 1000\n      testString += Math.random() + \" \"\n      i++\n\n    compressed = compress(testString)\n\n    assert compressed.length < testString.length\n    decompressed = decompress(compressed)\n    assert.equal decompressed, testString\n",
          "type": "blob"
        }
      },
      "distribution": {
        "main": {
          "path": "main",
          "content": "// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>\n// This work is free. You can redistribute it and/or modify it\n// under the terms of the WTFPL, Version 2\n// For more information see LICENSE.txt or http://www.wtfpl.net/\n//\n// For more information, the home page:\n// http://pieroxy.net/blog/pages/lz-string/testing.html\n//\n// LZ-based compression algorithm, version 1.3.3\nvar LZString = {\n  \n  \n  // private property\n  _keyStr : \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\",\n  _f : String.fromCharCode,\n  \n  compressToBase64 : function (input) {\n    if (input == null) return \"\";\n    var output = \"\";\n    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;\n    var i = 0;\n    \n    input = LZString.compress(input);\n    \n    while (i < input.length*2) {\n      \n      if (i%2==0) {\n        chr1 = input.charCodeAt(i/2) >> 8;\n        chr2 = input.charCodeAt(i/2) & 255;\n        if (i/2+1 < input.length) \n          chr3 = input.charCodeAt(i/2+1) >> 8;\n        else \n          chr3 = NaN;\n      } else {\n        chr1 = input.charCodeAt((i-1)/2) & 255;\n        if ((i+1)/2 < input.length) {\n          chr2 = input.charCodeAt((i+1)/2) >> 8;\n          chr3 = input.charCodeAt((i+1)/2) & 255;\n        } else \n          chr2=chr3=NaN;\n      }\n      i+=3;\n      \n      enc1 = chr1 >> 2;\n      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);\n      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);\n      enc4 = chr3 & 63;\n      \n      if (isNaN(chr2)) {\n        enc3 = enc4 = 64;\n      } else if (isNaN(chr3)) {\n        enc4 = 64;\n      }\n      \n      output = output +\n        LZString._keyStr.charAt(enc1) + LZString._keyStr.charAt(enc2) +\n          LZString._keyStr.charAt(enc3) + LZString._keyStr.charAt(enc4);\n      \n    }\n    \n    return output;\n  },\n  \n  decompressFromBase64 : function (input) {\n    if (input == null) return \"\";\n    var output = \"\",\n        ol = 0, \n        output_,\n        chr1, chr2, chr3,\n        enc1, enc2, enc3, enc4,\n        i = 0, f=LZString._f;\n    \n    input = input.replace(/[^A-Za-z0-9\\+\\/\\=]/g, \"\");\n    \n    while (i < input.length) {\n      \n      enc1 = LZString._keyStr.indexOf(input.charAt(i++));\n      enc2 = LZString._keyStr.indexOf(input.charAt(i++));\n      enc3 = LZString._keyStr.indexOf(input.charAt(i++));\n      enc4 = LZString._keyStr.indexOf(input.charAt(i++));\n      \n      chr1 = (enc1 << 2) | (enc2 >> 4);\n      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);\n      chr3 = ((enc3 & 3) << 6) | enc4;\n      \n      if (ol%2==0) {\n        output_ = chr1 << 8;\n        \n        if (enc3 != 64) {\n          output += f(output_ | chr2);\n        }\n        if (enc4 != 64) {\n          output_ = chr3 << 8;\n        }\n      } else {\n        output = output + f(output_ | chr1);\n        \n        if (enc3 != 64) {\n          output_ = chr2 << 8;\n        }\n        if (enc4 != 64) {\n          output += f(output_ | chr3);\n        }\n      }\n      ol+=3;\n    }\n    \n    return LZString.decompress(output);\n    \n  },\n\n  compressToUTF16 : function (input) {\n    if (input == null) return \"\";\n    var output = \"\",\n        i,c,\n        current,\n        status = 0,\n        f = LZString._f;\n    \n    input = LZString.compress(input);\n    \n    for (i=0 ; i<input.length ; i++) {\n      c = input.charCodeAt(i);\n      switch (status++) {\n        case 0:\n          output += f((c >> 1)+32);\n          current = (c & 1) << 14;\n          break;\n        case 1:\n          output += f((current + (c >> 2))+32);\n          current = (c & 3) << 13;\n          break;\n        case 2:\n          output += f((current + (c >> 3))+32);\n          current = (c & 7) << 12;\n          break;\n        case 3:\n          output += f((current + (c >> 4))+32);\n          current = (c & 15) << 11;\n          break;\n        case 4:\n          output += f((current + (c >> 5))+32);\n          current = (c & 31) << 10;\n          break;\n        case 5:\n          output += f((current + (c >> 6))+32);\n          current = (c & 63) << 9;\n          break;\n        case 6:\n          output += f((current + (c >> 7))+32);\n          current = (c & 127) << 8;\n          break;\n        case 7:\n          output += f((current + (c >> 8))+32);\n          current = (c & 255) << 7;\n          break;\n        case 8:\n          output += f((current + (c >> 9))+32);\n          current = (c & 511) << 6;\n          break;\n        case 9:\n          output += f((current + (c >> 10))+32);\n          current = (c & 1023) << 5;\n          break;\n        case 10:\n          output += f((current + (c >> 11))+32);\n          current = (c & 2047) << 4;\n          break;\n        case 11:\n          output += f((current + (c >> 12))+32);\n          current = (c & 4095) << 3;\n          break;\n        case 12:\n          output += f((current + (c >> 13))+32);\n          current = (c & 8191) << 2;\n          break;\n        case 13:\n          output += f((current + (c >> 14))+32);\n          current = (c & 16383) << 1;\n          break;\n        case 14:\n          output += f((current + (c >> 15))+32, (c & 32767)+32);\n          status = 0;\n          break;\n      }\n    }\n    \n    return output + f(current + 32);\n  },\n  \n\n  decompressFromUTF16 : function (input) {\n    if (input == null) return \"\";\n    var output = \"\",\n        current,c,\n        status=0,\n        i = 0,\n        f = LZString._f;\n    \n    while (i < input.length) {\n      c = input.charCodeAt(i) - 32;\n      \n      switch (status++) {\n        case 0:\n          current = c << 1;\n          break;\n        case 1:\n          output += f(current | (c >> 14));\n          current = (c&16383) << 2;\n          break;\n        case 2:\n          output += f(current | (c >> 13));\n          current = (c&8191) << 3;\n          break;\n        case 3:\n          output += f(current | (c >> 12));\n          current = (c&4095) << 4;\n          break;\n        case 4:\n          output += f(current | (c >> 11));\n          current = (c&2047) << 5;\n          break;\n        case 5:\n          output += f(current | (c >> 10));\n          current = (c&1023) << 6;\n          break;\n        case 6:\n          output += f(current | (c >> 9));\n          current = (c&511) << 7;\n          break;\n        case 7:\n          output += f(current | (c >> 8));\n          current = (c&255) << 8;\n          break;\n        case 8:\n          output += f(current | (c >> 7));\n          current = (c&127) << 9;\n          break;\n        case 9:\n          output += f(current | (c >> 6));\n          current = (c&63) << 10;\n          break;\n        case 10:\n          output += f(current | (c >> 5));\n          current = (c&31) << 11;\n          break;\n        case 11:\n          output += f(current | (c >> 4));\n          current = (c&15) << 12;\n          break;\n        case 12:\n          output += f(current | (c >> 3));\n          current = (c&7) << 13;\n          break;\n        case 13:\n          output += f(current | (c >> 2));\n          current = (c&3) << 14;\n          break;\n        case 14:\n          output += f(current | (c >> 1));\n          current = (c&1) << 15;\n          break;\n        case 15:\n          output += f(current | c);\n          status=0;\n          break;\n      }\n      \n      \n      i++;\n    }\n    \n    return LZString.decompress(output);\n    //return output;\n    \n  },\n\n\n  \n  compress: function (uncompressed) {\n    if (uncompressed == null) return \"\";\n    var i, value,\n        context_dictionary= {},\n        context_dictionaryToCreate= {},\n        context_c=\"\",\n        context_wc=\"\",\n        context_w=\"\",\n        context_enlargeIn= 2, // Compensate for the first entry which should not count\n        context_dictSize= 3,\n        context_numBits= 2,\n        context_data_string=\"\", \n        context_data_val=0, \n        context_data_position=0,\n        ii,\n        f=LZString._f;\n    \n    for (ii = 0; ii < uncompressed.length; ii += 1) {\n      context_c = uncompressed.charAt(ii);\n      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {\n        context_dictionary[context_c] = context_dictSize++;\n        context_dictionaryToCreate[context_c] = true;\n      }\n      \n      context_wc = context_w + context_c;\n      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {\n        context_w = context_wc;\n      } else {\n        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {\n          if (context_w.charCodeAt(0)<256) {\n            for (i=0 ; i<context_numBits ; i++) {\n              context_data_val = (context_data_val << 1);\n              if (context_data_position == 15) {\n                context_data_position = 0;\n                context_data_string += f(context_data_val);\n                context_data_val = 0;\n              } else {\n                context_data_position++;\n              }\n            }\n            value = context_w.charCodeAt(0);\n            for (i=0 ; i<8 ; i++) {\n              context_data_val = (context_data_val << 1) | (value&1);\n              if (context_data_position == 15) {\n                context_data_position = 0;\n                context_data_string += f(context_data_val);\n                context_data_val = 0;\n              } else {\n                context_data_position++;\n              }\n              value = value >> 1;\n            }\n          } else {\n            value = 1;\n            for (i=0 ; i<context_numBits ; i++) {\n              context_data_val = (context_data_val << 1) | value;\n              if (context_data_position == 15) {\n                context_data_position = 0;\n                context_data_string += f(context_data_val);\n                context_data_val = 0;\n              } else {\n                context_data_position++;\n              }\n              value = 0;\n            }\n            value = context_w.charCodeAt(0);\n            for (i=0 ; i<16 ; i++) {\n              context_data_val = (context_data_val << 1) | (value&1);\n              if (context_data_position == 15) {\n                context_data_position = 0;\n                context_data_string += f(context_data_val);\n                context_data_val = 0;\n              } else {\n                context_data_position++;\n              }\n              value = value >> 1;\n            }\n          }\n          context_enlargeIn--;\n          if (context_enlargeIn == 0) {\n            context_enlargeIn = Math.pow(2, context_numBits);\n            context_numBits++;\n          }\n          delete context_dictionaryToCreate[context_w];\n        } else {\n          value = context_dictionary[context_w];\n          for (i=0 ; i<context_numBits ; i++) {\n            context_data_val = (context_data_val << 1) | (value&1);\n            if (context_data_position == 15) {\n              context_data_position = 0;\n              context_data_string += f(context_data_val);\n              context_data_val = 0;\n            } else {\n              context_data_position++;\n            }\n            value = value >> 1;\n          }\n          \n          \n        }\n        context_enlargeIn--;\n        if (context_enlargeIn == 0) {\n          context_enlargeIn = Math.pow(2, context_numBits);\n          context_numBits++;\n        }\n        // Add wc to the dictionary.\n        context_dictionary[context_wc] = context_dictSize++;\n        context_w = String(context_c);\n      }\n    }\n    \n    // Output the code for w.\n    if (context_w !== \"\") {\n      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {\n        if (context_w.charCodeAt(0)<256) {\n          for (i=0 ; i<context_numBits ; i++) {\n            context_data_val = (context_data_val << 1);\n            if (context_data_position == 15) {\n              context_data_position = 0;\n              context_data_string += f(context_data_val);\n              context_data_val = 0;\n            } else {\n              context_data_position++;\n            }\n          }\n          value = context_w.charCodeAt(0);\n          for (i=0 ; i<8 ; i++) {\n            context_data_val = (context_data_val << 1) | (value&1);\n            if (context_data_position == 15) {\n              context_data_position = 0;\n              context_data_string += f(context_data_val);\n              context_data_val = 0;\n            } else {\n              context_data_position++;\n            }\n            value = value >> 1;\n          }\n        } else {\n          value = 1;\n          for (i=0 ; i<context_numBits ; i++) {\n            context_data_val = (context_data_val << 1) | value;\n            if (context_data_position == 15) {\n              context_data_position = 0;\n              context_data_string += f(context_data_val);\n              context_data_val = 0;\n            } else {\n              context_data_position++;\n            }\n            value = 0;\n          }\n          value = context_w.charCodeAt(0);\n          for (i=0 ; i<16 ; i++) {\n            context_data_val = (context_data_val << 1) | (value&1);\n            if (context_data_position == 15) {\n              context_data_position = 0;\n              context_data_string += f(context_data_val);\n              context_data_val = 0;\n            } else {\n              context_data_position++;\n            }\n            value = value >> 1;\n          }\n        }\n        context_enlargeIn--;\n        if (context_enlargeIn == 0) {\n          context_enlargeIn = Math.pow(2, context_numBits);\n          context_numBits++;\n        }\n        delete context_dictionaryToCreate[context_w];\n      } else {\n        value = context_dictionary[context_w];\n        for (i=0 ; i<context_numBits ; i++) {\n          context_data_val = (context_data_val << 1) | (value&1);\n          if (context_data_position == 15) {\n            context_data_position = 0;\n            context_data_string += f(context_data_val);\n            context_data_val = 0;\n          } else {\n            context_data_position++;\n          }\n          value = value >> 1;\n        }\n        \n        \n      }\n      context_enlargeIn--;\n      if (context_enlargeIn == 0) {\n        context_enlargeIn = Math.pow(2, context_numBits);\n        context_numBits++;\n      }\n    }\n    \n    // Mark the end of the stream\n    value = 2;\n    for (i=0 ; i<context_numBits ; i++) {\n      context_data_val = (context_data_val << 1) | (value&1);\n      if (context_data_position == 15) {\n        context_data_position = 0;\n        context_data_string += f(context_data_val);\n        context_data_val = 0;\n      } else {\n        context_data_position++;\n      }\n      value = value >> 1;\n    }\n    \n    // Flush the last char\n    while (true) {\n      context_data_val = (context_data_val << 1);\n      if (context_data_position == 15) {\n        context_data_string += f(context_data_val);\n        break;\n      }\n      else context_data_position++;\n    }\n    return context_data_string;\n  },\n  \n  decompress: function (compressed) {\n    if (compressed == null) return \"\";\n    if (compressed == \"\") return null;\n    var dictionary = [],\n        next,\n        enlargeIn = 4,\n        dictSize = 4,\n        numBits = 3,\n        entry = \"\",\n        result = \"\",\n        i,\n        w,\n        bits, resb, maxpower, power,\n        c,\n        f = LZString._f,\n        data = {string:compressed, val:compressed.charCodeAt(0), position:32768, index:1};\n    \n    for (i = 0; i < 3; i += 1) {\n      dictionary[i] = i;\n    }\n    \n    bits = 0;\n    maxpower = Math.pow(2,2);\n    power=1;\n    while (power!=maxpower) {\n      resb = data.val & data.position;\n      data.position >>= 1;\n      if (data.position == 0) {\n        data.position = 32768;\n        data.val = data.string.charCodeAt(data.index++);\n      }\n      bits |= (resb>0 ? 1 : 0) * power;\n      power <<= 1;\n    }\n    \n    switch (next = bits) {\n      case 0: \n          bits = 0;\n          maxpower = Math.pow(2,8);\n          power=1;\n          while (power!=maxpower) {\n            resb = data.val & data.position;\n            data.position >>= 1;\n            if (data.position == 0) {\n              data.position = 32768;\n              data.val = data.string.charCodeAt(data.index++);\n            }\n            bits |= (resb>0 ? 1 : 0) * power;\n            power <<= 1;\n          }\n        c = f(bits);\n        break;\n      case 1: \n          bits = 0;\n          maxpower = Math.pow(2,16);\n          power=1;\n          while (power!=maxpower) {\n            resb = data.val & data.position;\n            data.position >>= 1;\n            if (data.position == 0) {\n              data.position = 32768;\n              data.val = data.string.charCodeAt(data.index++);\n            }\n            bits |= (resb>0 ? 1 : 0) * power;\n            power <<= 1;\n          }\n        c = f(bits);\n        break;\n      case 2: \n        return \"\";\n    }\n    dictionary[3] = c;\n    w = result = c;\n    while (true) {\n      if (data.index > data.string.length) {\n        return \"\";\n      }\n      \n      bits = 0;\n      maxpower = Math.pow(2,numBits);\n      power=1;\n      while (power!=maxpower) {\n        resb = data.val & data.position;\n        data.position >>= 1;\n        if (data.position == 0) {\n          data.position = 32768;\n          data.val = data.string.charCodeAt(data.index++);\n        }\n        bits |= (resb>0 ? 1 : 0) * power;\n        power <<= 1;\n      }\n\n      switch (c = bits) {\n        case 0: \n          bits = 0;\n          maxpower = Math.pow(2,8);\n          power=1;\n          while (power!=maxpower) {\n            resb = data.val & data.position;\n            data.position >>= 1;\n            if (data.position == 0) {\n              data.position = 32768;\n              data.val = data.string.charCodeAt(data.index++);\n            }\n            bits |= (resb>0 ? 1 : 0) * power;\n            power <<= 1;\n          }\n\n          dictionary[dictSize++] = f(bits);\n          c = dictSize-1;\n          enlargeIn--;\n          break;\n        case 1: \n          bits = 0;\n          maxpower = Math.pow(2,16);\n          power=1;\n          while (power!=maxpower) {\n            resb = data.val & data.position;\n            data.position >>= 1;\n            if (data.position == 0) {\n              data.position = 32768;\n              data.val = data.string.charCodeAt(data.index++);\n            }\n            bits |= (resb>0 ? 1 : 0) * power;\n            power <<= 1;\n          }\n          dictionary[dictSize++] = f(bits);\n          c = dictSize-1;\n          enlargeIn--;\n          break;\n        case 2: \n          return result;\n      }\n      \n      if (enlargeIn == 0) {\n        enlargeIn = Math.pow(2, numBits);\n        numBits++;\n      }\n      \n      if (dictionary[c]) {\n        entry = dictionary[c];\n      } else {\n        if (c === dictSize) {\n          entry = w + w.charAt(0);\n        } else {\n          return null;\n        }\n      }\n      result += entry;\n      \n      // Add w+entry[0] to the dictionary.\n      dictionary[dictSize++] = w + entry.charAt(0);\n      enlargeIn--;\n      \n      w = entry;\n      \n      if (enlargeIn == 0) {\n        enlargeIn = Math.pow(2, numBits);\n        numBits++;\n      }\n      \n    }\n  }\n};\n\nif( typeof module !== 'undefined' && module != null ) {\n  module.exports = LZString\n}\n",
          "type": "blob"
        },
        "tests/lz-string-spec": {
          "path": "tests/lz-string-spec",
          "content": "LZString = require(\"../main\")\n\ndescribe(\"LZString\", function(compress, decompress) {\n    it('compresses and decompresses  \"Hello world!\"', function() {\n        var compressed = compress('Hello world!');\n        expect(compressed).not.toBe('Hello world!');\n        var decompressed = decompress(compressed);\n        expect(decompressed).toBe('Hello world!');\n    });\n\n    it('compresses and decompresses null', function() {\n        var compressed = compress(null);\n        expect(compressed).toBe('');\n        expect(typeof compressed).toBe(typeof '');\n        var decompressed = decompress(compressed);\n        expect(decompressed).toBe(null);\n    });\n\n    it('compresses and decompresses undefined', function() {\n        var compressed = compress();\n        expect(compressed).toBe('');\n        expect(typeof compressed).toBe(typeof '');\n        var decompressed = decompress(compressed);\n        expect(decompressed).toBe(null);\n    });\n\n    it('decompresses null', function() {\n        var decompressed = decompress(null);\n        expect(decompressed).toBe('');\n    });\n\n    it('compresses and decompresses an empty string', function() {\n        var compressed = compress('');\n        expect(compressed).not.toBe('');\n        expect(typeof compressed).toBe(typeof '');\n        var decompressed = decompress(compressed);\n        expect(decompressed).toBe('');\n    });\n\n    it('compresses and decompresses all printable UTF-16 characters',\n        function() {\n        var testString = '';\n        var i;\n        for (i = 32; i < 127; ++i) {\n            testString += String.fromCharCode(i);\n        }\n        for (i = 128 + 32; i < 55296; ++i) {\n            testString += String.fromCharCode(i);\n        }\n        for (i = 63744; i < 65536; ++i) {\n            testString += String.fromCharCode(i);\n        }\n        //console.log(testString);\n        var compressed = compress(testString);\n        expect(compressed).not.toBe(testString);\n        var decompressed = decompress(compressed);\n        expect(decompressed).toBe(testString);\n    });\n\n    it('compresses and decompresses a string that repeats',\n        function() {\n        var testString = 'aaaaabaaaaacaaaaadaaaaaeaaaaa';\n        var compressed = compress(testString);\n        expect(compressed).not.toBe(testString);\n        expect(compressed.length).toBeLessThan(testString.length);\n        var decompressed = decompress(compressed);\n        expect(decompressed).toBe(testString);\n    });\n\n    it('compresses and decompresses a long string',\n        function() {\n        var testString = '';\n        var i;\n        for (i=0 ; i<1000 ; i++)\n          testString += Math.random() + \" \";\n            \n        var compressed = compress(testString);\n        expect(compressed).not.toBe(testString);\n        expect(compressed.length).toBeLessThan(testString.length);\n        var decompressed = decompress(compressed);\n        expect(decompressed).toBe(testString);\n    });\n});\n\ndescribe('LZString', function() {\n    it('base 64', function() {\n        compressionTests(LZString.compressToBase64,\n                         LZString.decompressFromBase64);\n    });\n\n    it('UTF-16', function() {\n        compressionTests(LZString.compressToUTF16,\n                         LZString.decompressFromUTF16);\n    });\n});\n",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"1.3.3\",\"remoteDependencies\":[\"http://strd6.github.io/require/v0.2.2.js\"]};",
          "type": "blob"
        },
        "test/main": {
          "path": "test/main",
          "content": "(function() {\n  var LZString, compress, decompress, _ref;\n\n  _ref = LZString = require(\"../main\"), compress = _ref.compress, decompress = _ref.decompress;\n\n  describe(\"LZString\", function() {\n    it(\"compresses and decompresses \\\"Hello world!\\\"\", function() {\n      var compressed, decompressed;\n      compressed = compress(\"Hello world!\");\n      decompressed = decompress(compressed);\n      return assert.equal(decompressed, \"Hello world!\");\n    });\n    it(\"compresses and decompresses null\", function() {\n      var compressed, decompressed;\n      compressed = compress(null);\n      assert.equal(compressed, \"\");\n      decompressed = decompress(compressed);\n      return assert.equal(decompressed, null);\n    });\n    it(\"compresses and decompresses an empty string\", function() {\n      var compressed, decompressed;\n      compressed = compress(\"\");\n      decompressed = decompress(compressed);\n      return assert.equal(decompressed, \"\");\n    });\n    it(\"compresses and decompresses all printable UTF-16 characters\", function() {\n      var compressed, decompressed, i, testString;\n      testString = \"\";\n      i = void 0;\n      i = 32;\n      while (i < 127) {\n        testString += String.fromCharCode(i);\n        ++i;\n      }\n      i = 128 + 32;\n      while (i < 55296) {\n        testString += String.fromCharCode(i);\n        ++i;\n      }\n      i = 63744;\n      while (i < 65536) {\n        testString += String.fromCharCode(i);\n        ++i;\n      }\n      compressed = compress(testString);\n      decompressed = decompress(compressed);\n      return assert.equal(decompressed, testString);\n    });\n    it(\"compresses and decompresses a string that repeats\", function() {\n      var compressed, decompressed, testString;\n      testString = \"aaaaabaaaaacaaaaadaaaaaeaaaaa\";\n      compressed = compress(testString);\n      assert(compressed.length < testString.length);\n      decompressed = decompress(compressed);\n      return assert.equal(decompressed, testString);\n    });\n    return it(\"compresses and decompresses a long string\", function() {\n      var compressed, decompressed, i, testString;\n      testString = \"\";\n      i = 0;\n      while (i < 1000) {\n        testString += Math.random() + \" \";\n        i++;\n      }\n      compressed = compress(testString);\n      assert(compressed.length < testString.length);\n      decompressed = decompress(compressed);\n      return assert.equal(decompressed, testString);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/main.coffee",
          "type": "blob"
        }
      },
      "entryPoint": "main",
      "dependencies": {},
      "remoteDependencies": [
        "http://strd6.github.io/require/v0.2.2.js"
      ],
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "repository": {
        "id": 14217030,
        "name": "lz-string",
        "full_name": "STRd6/lz-string",
        "owner": {
          "login": "STRd6",
          "id": 18894,
          "avatar_url": "https://0.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png&r=x",
          "gravatar_id": "33117162fff8a9cf50544a604f60c045",
          "url": "https://api.github.com/users/STRd6",
          "html_url": "https://github.com/STRd6",
          "followers_url": "https://api.github.com/users/STRd6/followers",
          "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
          "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
          "organizations_url": "https://api.github.com/users/STRd6/orgs",
          "repos_url": "https://api.github.com/users/STRd6/repos",
          "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
          "received_events_url": "https://api.github.com/users/STRd6/received_events",
          "type": "User",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/STRd6/lz-string",
        "description": "LZ-based compression algorithm for JavaScript",
        "fork": true,
        "url": "https://api.github.com/repos/STRd6/lz-string",
        "forks_url": "https://api.github.com/repos/STRd6/lz-string/forks",
        "keys_url": "https://api.github.com/repos/STRd6/lz-string/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/STRd6/lz-string/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/STRd6/lz-string/teams",
        "hooks_url": "https://api.github.com/repos/STRd6/lz-string/hooks",
        "issue_events_url": "https://api.github.com/repos/STRd6/lz-string/issues/events{/number}",
        "events_url": "https://api.github.com/repos/STRd6/lz-string/events",
        "assignees_url": "https://api.github.com/repos/STRd6/lz-string/assignees{/user}",
        "branches_url": "https://api.github.com/repos/STRd6/lz-string/branches{/branch}",
        "tags_url": "https://api.github.com/repos/STRd6/lz-string/tags",
        "blobs_url": "https://api.github.com/repos/STRd6/lz-string/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/STRd6/lz-string/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/STRd6/lz-string/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/STRd6/lz-string/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/STRd6/lz-string/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/STRd6/lz-string/languages",
        "stargazers_url": "https://api.github.com/repos/STRd6/lz-string/stargazers",
        "contributors_url": "https://api.github.com/repos/STRd6/lz-string/contributors",
        "subscribers_url": "https://api.github.com/repos/STRd6/lz-string/subscribers",
        "subscription_url": "https://api.github.com/repos/STRd6/lz-string/subscription",
        "commits_url": "https://api.github.com/repos/STRd6/lz-string/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/STRd6/lz-string/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/STRd6/lz-string/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/STRd6/lz-string/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/STRd6/lz-string/contents/{+path}",
        "compare_url": "https://api.github.com/repos/STRd6/lz-string/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/STRd6/lz-string/merges",
        "archive_url": "https://api.github.com/repos/STRd6/lz-string/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/STRd6/lz-string/downloads",
        "issues_url": "https://api.github.com/repos/STRd6/lz-string/issues{/number}",
        "pulls_url": "https://api.github.com/repos/STRd6/lz-string/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/STRd6/lz-string/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/STRd6/lz-string/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/STRd6/lz-string/labels{/name}",
        "releases_url": "https://api.github.com/repos/STRd6/lz-string/releases{/id}",
        "created_at": "2013-11-07T21:56:34Z",
        "updated_at": "2013-11-07T22:02:49Z",
        "pushed_at": "2013-11-07T22:02:44Z",
        "git_url": "git://github.com/STRd6/lz-string.git",
        "ssh_url": "git@github.com:STRd6/lz-string.git",
        "clone_url": "https://github.com/STRd6/lz-string.git",
        "svn_url": "https://github.com/STRd6/lz-string",
        "homepage": null,
        "size": 134,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "JavaScript",
        "has_issues": false,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "parent": {
          "id": 9938102,
          "name": "lz-string",
          "full_name": "pieroxy/lz-string",
          "owner": {
            "login": "pieroxy",
            "id": 1426854,
            "avatar_url": "https://2.gravatar.com/avatar/e62e85a6ea5257c79252947be6913696?d=https%3A%2F%2Fidenticons.github.com%2Fccf41f2204389b1165e0221906776ab1.png&r=x",
            "gravatar_id": "e62e85a6ea5257c79252947be6913696",
            "url": "https://api.github.com/users/pieroxy",
            "html_url": "https://github.com/pieroxy",
            "followers_url": "https://api.github.com/users/pieroxy/followers",
            "following_url": "https://api.github.com/users/pieroxy/following{/other_user}",
            "gists_url": "https://api.github.com/users/pieroxy/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/pieroxy/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/pieroxy/subscriptions",
            "organizations_url": "https://api.github.com/users/pieroxy/orgs",
            "repos_url": "https://api.github.com/users/pieroxy/repos",
            "events_url": "https://api.github.com/users/pieroxy/events{/privacy}",
            "received_events_url": "https://api.github.com/users/pieroxy/received_events",
            "type": "User",
            "site_admin": false
          },
          "private": false,
          "html_url": "https://github.com/pieroxy/lz-string",
          "description": "LZ-based compression algorithm for JavaScript",
          "fork": false,
          "url": "https://api.github.com/repos/pieroxy/lz-string",
          "forks_url": "https://api.github.com/repos/pieroxy/lz-string/forks",
          "keys_url": "https://api.github.com/repos/pieroxy/lz-string/keys{/key_id}",
          "collaborators_url": "https://api.github.com/repos/pieroxy/lz-string/collaborators{/collaborator}",
          "teams_url": "https://api.github.com/repos/pieroxy/lz-string/teams",
          "hooks_url": "https://api.github.com/repos/pieroxy/lz-string/hooks",
          "issue_events_url": "https://api.github.com/repos/pieroxy/lz-string/issues/events{/number}",
          "events_url": "https://api.github.com/repos/pieroxy/lz-string/events",
          "assignees_url": "https://api.github.com/repos/pieroxy/lz-string/assignees{/user}",
          "branches_url": "https://api.github.com/repos/pieroxy/lz-string/branches{/branch}",
          "tags_url": "https://api.github.com/repos/pieroxy/lz-string/tags",
          "blobs_url": "https://api.github.com/repos/pieroxy/lz-string/git/blobs{/sha}",
          "git_tags_url": "https://api.github.com/repos/pieroxy/lz-string/git/tags{/sha}",
          "git_refs_url": "https://api.github.com/repos/pieroxy/lz-string/git/refs{/sha}",
          "trees_url": "https://api.github.com/repos/pieroxy/lz-string/git/trees{/sha}",
          "statuses_url": "https://api.github.com/repos/pieroxy/lz-string/statuses/{sha}",
          "languages_url": "https://api.github.com/repos/pieroxy/lz-string/languages",
          "stargazers_url": "https://api.github.com/repos/pieroxy/lz-string/stargazers",
          "contributors_url": "https://api.github.com/repos/pieroxy/lz-string/contributors",
          "subscribers_url": "https://api.github.com/repos/pieroxy/lz-string/subscribers",
          "subscription_url": "https://api.github.com/repos/pieroxy/lz-string/subscription",
          "commits_url": "https://api.github.com/repos/pieroxy/lz-string/commits{/sha}",
          "git_commits_url": "https://api.github.com/repos/pieroxy/lz-string/git/commits{/sha}",
          "comments_url": "https://api.github.com/repos/pieroxy/lz-string/comments{/number}",
          "issue_comment_url": "https://api.github.com/repos/pieroxy/lz-string/issues/comments/{number}",
          "contents_url": "https://api.github.com/repos/pieroxy/lz-string/contents/{+path}",
          "compare_url": "https://api.github.com/repos/pieroxy/lz-string/compare/{base}...{head}",
          "merges_url": "https://api.github.com/repos/pieroxy/lz-string/merges",
          "archive_url": "https://api.github.com/repos/pieroxy/lz-string/{archive_format}{/ref}",
          "downloads_url": "https://api.github.com/repos/pieroxy/lz-string/downloads",
          "issues_url": "https://api.github.com/repos/pieroxy/lz-string/issues{/number}",
          "pulls_url": "https://api.github.com/repos/pieroxy/lz-string/pulls{/number}",
          "milestones_url": "https://api.github.com/repos/pieroxy/lz-string/milestones{/number}",
          "notifications_url": "https://api.github.com/repos/pieroxy/lz-string/notifications{?since,all,participating}",
          "labels_url": "https://api.github.com/repos/pieroxy/lz-string/labels{/name}",
          "releases_url": "https://api.github.com/repos/pieroxy/lz-string/releases{/id}",
          "created_at": "2013-05-08T14:26:27Z",
          "updated_at": "2013-11-07T21:56:34Z",
          "pushed_at": "2013-10-27T23:43:36Z",
          "git_url": "git://github.com/pieroxy/lz-string.git",
          "ssh_url": "git@github.com:pieroxy/lz-string.git",
          "clone_url": "https://github.com/pieroxy/lz-string.git",
          "svn_url": "https://github.com/pieroxy/lz-string",
          "homepage": null,
          "size": 352,
          "stargazers_count": 173,
          "watchers_count": 173,
          "language": "JavaScript",
          "has_issues": true,
          "has_downloads": true,
          "has_wiki": true,
          "forks_count": 32,
          "mirror_url": null,
          "open_issues_count": 1,
          "forks": 32,
          "open_issues": 1,
          "watchers": 173,
          "default_branch": "master",
          "master_branch": "master"
        },
        "source": {
          "id": 9938102,
          "name": "lz-string",
          "full_name": "pieroxy/lz-string",
          "owner": {
            "login": "pieroxy",
            "id": 1426854,
            "avatar_url": "https://2.gravatar.com/avatar/e62e85a6ea5257c79252947be6913696?d=https%3A%2F%2Fidenticons.github.com%2Fccf41f2204389b1165e0221906776ab1.png&r=x",
            "gravatar_id": "e62e85a6ea5257c79252947be6913696",
            "url": "https://api.github.com/users/pieroxy",
            "html_url": "https://github.com/pieroxy",
            "followers_url": "https://api.github.com/users/pieroxy/followers",
            "following_url": "https://api.github.com/users/pieroxy/following{/other_user}",
            "gists_url": "https://api.github.com/users/pieroxy/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/pieroxy/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/pieroxy/subscriptions",
            "organizations_url": "https://api.github.com/users/pieroxy/orgs",
            "repos_url": "https://api.github.com/users/pieroxy/repos",
            "events_url": "https://api.github.com/users/pieroxy/events{/privacy}",
            "received_events_url": "https://api.github.com/users/pieroxy/received_events",
            "type": "User",
            "site_admin": false
          },
          "private": false,
          "html_url": "https://github.com/pieroxy/lz-string",
          "description": "LZ-based compression algorithm for JavaScript",
          "fork": false,
          "url": "https://api.github.com/repos/pieroxy/lz-string",
          "forks_url": "https://api.github.com/repos/pieroxy/lz-string/forks",
          "keys_url": "https://api.github.com/repos/pieroxy/lz-string/keys{/key_id}",
          "collaborators_url": "https://api.github.com/repos/pieroxy/lz-string/collaborators{/collaborator}",
          "teams_url": "https://api.github.com/repos/pieroxy/lz-string/teams",
          "hooks_url": "https://api.github.com/repos/pieroxy/lz-string/hooks",
          "issue_events_url": "https://api.github.com/repos/pieroxy/lz-string/issues/events{/number}",
          "events_url": "https://api.github.com/repos/pieroxy/lz-string/events",
          "assignees_url": "https://api.github.com/repos/pieroxy/lz-string/assignees{/user}",
          "branches_url": "https://api.github.com/repos/pieroxy/lz-string/branches{/branch}",
          "tags_url": "https://api.github.com/repos/pieroxy/lz-string/tags",
          "blobs_url": "https://api.github.com/repos/pieroxy/lz-string/git/blobs{/sha}",
          "git_tags_url": "https://api.github.com/repos/pieroxy/lz-string/git/tags{/sha}",
          "git_refs_url": "https://api.github.com/repos/pieroxy/lz-string/git/refs{/sha}",
          "trees_url": "https://api.github.com/repos/pieroxy/lz-string/git/trees{/sha}",
          "statuses_url": "https://api.github.com/repos/pieroxy/lz-string/statuses/{sha}",
          "languages_url": "https://api.github.com/repos/pieroxy/lz-string/languages",
          "stargazers_url": "https://api.github.com/repos/pieroxy/lz-string/stargazers",
          "contributors_url": "https://api.github.com/repos/pieroxy/lz-string/contributors",
          "subscribers_url": "https://api.github.com/repos/pieroxy/lz-string/subscribers",
          "subscription_url": "https://api.github.com/repos/pieroxy/lz-string/subscription",
          "commits_url": "https://api.github.com/repos/pieroxy/lz-string/commits{/sha}",
          "git_commits_url": "https://api.github.com/repos/pieroxy/lz-string/git/commits{/sha}",
          "comments_url": "https://api.github.com/repos/pieroxy/lz-string/comments{/number}",
          "issue_comment_url": "https://api.github.com/repos/pieroxy/lz-string/issues/comments/{number}",
          "contents_url": "https://api.github.com/repos/pieroxy/lz-string/contents/{+path}",
          "compare_url": "https://api.github.com/repos/pieroxy/lz-string/compare/{base}...{head}",
          "merges_url": "https://api.github.com/repos/pieroxy/lz-string/merges",
          "archive_url": "https://api.github.com/repos/pieroxy/lz-string/{archive_format}{/ref}",
          "downloads_url": "https://api.github.com/repos/pieroxy/lz-string/downloads",
          "issues_url": "https://api.github.com/repos/pieroxy/lz-string/issues{/number}",
          "pulls_url": "https://api.github.com/repos/pieroxy/lz-string/pulls{/number}",
          "milestones_url": "https://api.github.com/repos/pieroxy/lz-string/milestones{/number}",
          "notifications_url": "https://api.github.com/repos/pieroxy/lz-string/notifications{?since,all,participating}",
          "labels_url": "https://api.github.com/repos/pieroxy/lz-string/labels{/name}",
          "releases_url": "https://api.github.com/repos/pieroxy/lz-string/releases{/id}",
          "created_at": "2013-05-08T14:26:27Z",
          "updated_at": "2013-11-07T21:56:34Z",
          "pushed_at": "2013-10-27T23:43:36Z",
          "git_url": "git://github.com/pieroxy/lz-string.git",
          "ssh_url": "git@github.com:pieroxy/lz-string.git",
          "clone_url": "https://github.com/pieroxy/lz-string.git",
          "svn_url": "https://github.com/pieroxy/lz-string",
          "homepage": null,
          "size": 352,
          "stargazers_count": 173,
          "watchers_count": 173,
          "language": "JavaScript",
          "has_issues": true,
          "has_downloads": true,
          "has_wiki": true,
          "forks_count": 32,
          "mirror_url": null,
          "open_issues_count": 1,
          "forks": 32,
          "open_issues": 1,
          "watchers": 173,
          "default_branch": "master",
          "master_branch": "master"
        },
        "network_count": 32,
        "subscribers_count": 1,
        "branch": "v1.3.3",
        "defaultBranch": "master"
      }
    },
    "jquery-utils": {
      "version": "0.1.2",
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "jquery-utils\n============\n",
          "type": "blob"
        },
        "main.coffee.md": {
          "path": "main.coffee.md",
          "mode": "100644",
          "content": "    require \"hotkeys\"\n    require \"image-reader\"\n    require \"./take_class\"\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.1.2\"\nremoteDependencies: [\n  \"//code.jquery.com/jquery-1.10.1.min.js\"\n  \"http://strd6.github.io/tempest/javascripts/envweb.js\"\n  \"http://strd6.github.io/require/v0.2.2.js\"\n]\ndependencies:\n  hotkeys: \"STRd6/jquery.hotkeys:v0.9.0\"\n  \"image-reader\": \"STRd6/jquery-image_reader:v0.1.3\"\n",
          "type": "blob"
        },
        "take_class.coffee.md": {
          "path": "take_class.coffee.md",
          "mode": "100644",
          "content": "Take Class\n==========\n\nTake the named class from all the sibling elements. Perfect for something like\nradio buttons.\n\n    (($) ->\n      $.fn.takeClass = (name) ->\n        @addClass(name).siblings().removeClass(name)\n\n        return this\n    )(jQuery)\n",
          "type": "blob"
        },
        "test/take_class.coffee": {
          "path": "test/take_class.coffee",
          "mode": "100644",
          "content": "require \"../main\"\n\ndescribe \"jQuery#takeClass\", ->\n  it \"should exist\", ->\n    assert $.fn.takeClass\n",
          "type": "blob"
        },
        "test/image_reader.coffee": {
          "path": "test/image_reader.coffee",
          "mode": "100644",
          "content": "require \"../main\"\n\ndescribe \"jQuery#pasteImageReader\", ->\n  it \"should exist\", ->\n    assert $.fn.pasteImageReader\n\ndescribe \"jQuery#dropImageReader\", ->\n  it \"should exist\", ->\n    assert $.fn.dropImageReader\n",
          "type": "blob"
        }
      },
      "distribution": {
        "main": {
          "path": "main",
          "content": "(function() {\n  require(\"hotkeys\");\n\n  require(\"image-reader\");\n\n  require(\"./take_class\");\n\n}).call(this);\n\n//# sourceURL=main.coffee",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.1.2\",\"remoteDependencies\":[\"//code.jquery.com/jquery-1.10.1.min.js\",\"http://strd6.github.io/tempest/javascripts/envweb.js\",\"http://strd6.github.io/require/v0.2.2.js\"],\"dependencies\":{\"hotkeys\":\"STRd6/jquery.hotkeys:v0.9.0\",\"image-reader\":\"STRd6/jquery-image_reader:v0.1.3\"}};",
          "type": "blob"
        },
        "take_class": {
          "path": "take_class",
          "content": "(function() {\n  (function($) {\n    return $.fn.takeClass = function(name) {\n      this.addClass(name).siblings().removeClass(name);\n      return this;\n    };\n  })(jQuery);\n\n}).call(this);\n\n//# sourceURL=take_class.coffee",
          "type": "blob"
        },
        "test/take_class": {
          "path": "test/take_class",
          "content": "(function() {\n  require(\"../main\");\n\n  describe(\"jQuery#takeClass\", function() {\n    return it(\"should exist\", function() {\n      return assert($.fn.takeClass);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/take_class.coffee",
          "type": "blob"
        },
        "test/image_reader": {
          "path": "test/image_reader",
          "content": "(function() {\n  require(\"../main\");\n\n  describe(\"jQuery#pasteImageReader\", function() {\n    return it(\"should exist\", function() {\n      return assert($.fn.pasteImageReader);\n    });\n  });\n\n  describe(\"jQuery#dropImageReader\", function() {\n    return it(\"should exist\", function() {\n      return assert($.fn.dropImageReader);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/image_reader.coffee",
          "type": "blob"
        }
      },
      "entryPoint": "main",
      "dependencies": {
        "hotkeys": {
          "version": "0.9.0",
          "source": {
            "LICENSE": {
              "path": "LICENSE",
              "mode": "100644",
              "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
              "type": "blob"
            },
            "README.md": {
              "path": "README.md",
              "mode": "100644",
              "content": "jquery.hotkeys\n==============\n\njQuery hotkeys plugin\n",
              "type": "blob"
            },
            "hotkeys.coffee.md": {
              "path": "hotkeys.coffee.md",
              "mode": "100644",
              "content": "jQuery Hotkeys Plugin\n=====================\n\nCopyright 2010, John Resig\nDual licensed under the MIT or GPL Version 2 licenses.\n\nBased upon the plugin by Tzury Bar Yochay:\nhttp://github.com/tzuryby/hotkeys\n\nOriginal idea by:\nBinny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/\n\n    if jQuery? \n      ((jQuery) ->\n        isTextAcceptingInput = (element) ->\n          /textarea|select/i.test(element.nodeName) or element.type is \"text\" or element.type is \"password\"\n\n        isFunctionKey = (event) ->\n          (event.type != \"keypress\") && (112 <= event.which <= 123)\n\n        jQuery.hotkeys =\n          version: \"0.9.0\"\n\n          specialKeys:\n            8: \"backspace\"\n            9: \"tab\"\n            13: \"return\"\n            16: \"shift\"\n            17: \"ctrl\"\n            18: \"alt\"\n            19: \"pause\"\n            20: \"capslock\"\n            27: \"esc\"\n            32: \"space\"\n            33: \"pageup\"\n            34: \"pagedown\"\n            35: \"end\"\n            36: \"home\"\n            37: \"left\"\n            38: \"up\"\n            39: \"right\"\n            40: \"down\"\n            45: \"insert\"\n            46: \"del\"\n            96: \"0\"\n            97: \"1\"\n            98: \"2\"\n            99: \"3\"\n            100: \"4\"\n            101: \"5\"\n            102: \"6\"\n            103: \"7\"\n            104: \"8\"\n            105: \"9\"\n            106: \"*\"\n            107: \"+\"\n            109: \"-\"\n            110: \".\"\n            111 : \"/\"\n            112: \"f1\"\n            113: \"f2\"\n            114: \"f3\"\n            115: \"f4\"\n            116: \"f5\"\n            117: \"f6\"\n            118: \"f7\"\n            119: \"f8\"\n            120: \"f9\"\n            121: \"f10\"\n            122: \"f11\"\n            123: \"f12\"\n            144: \"numlock\"\n            145: \"scroll\"\n            186: \";\"\n            187: \"=\"\n            188: \",\"\n            189: \"-\"\n            190: \".\"\n            191: \"/\"\n            219: \"[\"\n            220: \"\\\\\"\n            221: \"]\"\n            222: \"'\"\n            224: \"meta\"\n\n          shiftNums:\n            \"`\": \"~\"\n            \"1\": \"!\"\n            \"2\": \"@\"\n            \"3\": \"#\"\n            \"4\": \"$\"\n            \"5\": \"%\"\n            \"6\": \"^\"\n            \"7\": \"&\"\n            \"8\": \"*\"\n            \"9\": \"(\"\n            \"0\": \")\"\n            \"-\": \"_\"\n            \"=\": \"+\"\n            \";\": \":\"\n            \"'\": \"\\\"\"\n            \",\": \"<\"\n            \".\": \">\"\n            \"/\": \"?\"\n            \"\\\\\": \"|\"\n\n        keyHandler = (handleObj) ->\n          # Only care when a possible input has been specified\n          if typeof handleObj.data != \"string\"\n            return\n\n          origHandler = handleObj.handler\n          keys = handleObj.data.toLowerCase().split(\" \")\n\n          handleObj.handler = (event) ->          \n            # Keypress represents characters, not special keys\n            special = event.type != \"keypress\" && jQuery.hotkeys.specialKeys[ event.which ]\n            character = String.fromCharCode( event.which ).toLowerCase()\n            modif = \"\"\n            possible = {}\n            target = event.target\n\n            # check combinations (alt|ctrl|shift+anything)\n            if event.altKey && special != \"alt\"\n              modif += \"alt+\"\n\n            if event.ctrlKey && special != \"ctrl\"\n              modif += \"ctrl+\"\n\n            # TODO: Need to make sure this works consistently across platforms\n            if event.metaKey && !event.ctrlKey && special != \"meta\"\n              modif += \"meta+\"\n\n            # Don't fire in text-accepting inputs that we didn't directly bind to\n            # unless a non-shift modifier key or function key is pressed\n            unless this == target\n              if isTextAcceptingInput(target) && !modif && !isFunctionKey(event)\n                return\n\n            if event.shiftKey && special != \"shift\"\n              modif += \"shift+\"\n\n            if special\n              possible[ modif + special ] = true\n            else\n              possible[ modif + character ] = true\n              possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true\n      \n              # \"$\" can be triggered as \"Shift+4\" or \"Shift+$\" or just \"$\"\n              if modif == \"shift+\"\n                possible[ jQuery.hotkeys.shiftNums[ character ] ] = true\n\n            for key in keys\n              if possible[key]\n                return origHandler.apply( this, arguments )\n\n        jQuery.each [ \"keydown\", \"keyup\", \"keypress\" ], ->\n          jQuery.event.special[ this ] = { add: keyHandler }\n\n      )(jQuery)\n    else\n      console.warn \"jQuery not found, no hotkeys added :(\"\n",
              "type": "blob"
            },
            "pixie.cson": {
              "path": "pixie.cson",
              "mode": "100644",
              "content": "version: \"0.9.0\"\nentryPoint: \"hotkeys\"\nremoteDependencies: [\n  \"//code.jquery.com/jquery-1.10.1.min.js\"\n  \"http://strd6.github.io/tempest/javascripts/envweb.js\"\n  \"http://strd6.github.io/require/v0.1.0.js\"\n]\n",
              "type": "blob"
            },
            "test/hotkeys.coffee": {
              "path": "test/hotkeys.coffee",
              "mode": "100644",
              "content": "require \"../hotkeys\"\n\ndescribe \"hotkeys binding\", ->\n  it \"should bind a hotkey\", (done) ->\n    $(document).bind \"keydown\", \"a\", ->\n      done()\n\n    $(document).trigger $.Event \"keydown\",\n      which: 65 # a\n      keyCode: 65\n",
              "type": "blob"
            }
          },
          "distribution": {
            "hotkeys": {
              "path": "hotkeys",
              "content": "(function() {\n  if (typeof jQuery !== \"undefined\" && jQuery !== null) {\n    (function(jQuery) {\n      var isFunctionKey, isTextAcceptingInput, keyHandler;\n      isTextAcceptingInput = function(element) {\n        return /textarea|select/i.test(element.nodeName) || element.type === \"text\" || element.type === \"password\";\n      };\n      isFunctionKey = function(event) {\n        var _ref;\n        return (event.type !== \"keypress\") && ((112 <= (_ref = event.which) && _ref <= 123));\n      };\n      jQuery.hotkeys = {\n        version: \"0.9.0\",\n        specialKeys: {\n          8: \"backspace\",\n          9: \"tab\",\n          13: \"return\",\n          16: \"shift\",\n          17: \"ctrl\",\n          18: \"alt\",\n          19: \"pause\",\n          20: \"capslock\",\n          27: \"esc\",\n          32: \"space\",\n          33: \"pageup\",\n          34: \"pagedown\",\n          35: \"end\",\n          36: \"home\",\n          37: \"left\",\n          38: \"up\",\n          39: \"right\",\n          40: \"down\",\n          45: \"insert\",\n          46: \"del\",\n          96: \"0\",\n          97: \"1\",\n          98: \"2\",\n          99: \"3\",\n          100: \"4\",\n          101: \"5\",\n          102: \"6\",\n          103: \"7\",\n          104: \"8\",\n          105: \"9\",\n          106: \"*\",\n          107: \"+\",\n          109: \"-\",\n          110: \".\",\n          111: \"/\",\n          112: \"f1\",\n          113: \"f2\",\n          114: \"f3\",\n          115: \"f4\",\n          116: \"f5\",\n          117: \"f6\",\n          118: \"f7\",\n          119: \"f8\",\n          120: \"f9\",\n          121: \"f10\",\n          122: \"f11\",\n          123: \"f12\",\n          144: \"numlock\",\n          145: \"scroll\",\n          186: \";\",\n          187: \"=\",\n          188: \",\",\n          189: \"-\",\n          190: \".\",\n          191: \"/\",\n          219: \"[\",\n          220: \"\\\\\",\n          221: \"]\",\n          222: \"'\",\n          224: \"meta\"\n        },\n        shiftNums: {\n          \"`\": \"~\",\n          \"1\": \"!\",\n          \"2\": \"@\",\n          \"3\": \"#\",\n          \"4\": \"$\",\n          \"5\": \"%\",\n          \"6\": \"^\",\n          \"7\": \"&\",\n          \"8\": \"*\",\n          \"9\": \"(\",\n          \"0\": \")\",\n          \"-\": \"_\",\n          \"=\": \"+\",\n          \";\": \":\",\n          \"'\": \"\\\"\",\n          \",\": \"<\",\n          \".\": \">\",\n          \"/\": \"?\",\n          \"\\\\\": \"|\"\n        }\n      };\n      keyHandler = function(handleObj) {\n        var keys, origHandler;\n        if (typeof handleObj.data !== \"string\") {\n          return;\n        }\n        origHandler = handleObj.handler;\n        keys = handleObj.data.toLowerCase().split(\" \");\n        return handleObj.handler = function(event) {\n          var character, key, modif, possible, special, target, _i, _len;\n          special = event.type !== \"keypress\" && jQuery.hotkeys.specialKeys[event.which];\n          character = String.fromCharCode(event.which).toLowerCase();\n          modif = \"\";\n          possible = {};\n          target = event.target;\n          if (event.altKey && special !== \"alt\") {\n            modif += \"alt+\";\n          }\n          if (event.ctrlKey && special !== \"ctrl\") {\n            modif += \"ctrl+\";\n          }\n          if (event.metaKey && !event.ctrlKey && special !== \"meta\") {\n            modif += \"meta+\";\n          }\n          if (this !== target) {\n            if (isTextAcceptingInput(target) && !modif && !isFunctionKey(event)) {\n              return;\n            }\n          }\n          if (event.shiftKey && special !== \"shift\") {\n            modif += \"shift+\";\n          }\n          if (special) {\n            possible[modif + special] = true;\n          } else {\n            possible[modif + character] = true;\n            possible[modif + jQuery.hotkeys.shiftNums[character]] = true;\n            if (modif === \"shift+\") {\n              possible[jQuery.hotkeys.shiftNums[character]] = true;\n            }\n          }\n          for (_i = 0, _len = keys.length; _i < _len; _i++) {\n            key = keys[_i];\n            if (possible[key]) {\n              return origHandler.apply(this, arguments);\n            }\n          }\n        };\n      };\n      return jQuery.each([\"keydown\", \"keyup\", \"keypress\"], function() {\n        return jQuery.event.special[this] = {\n          add: keyHandler\n        };\n      });\n    })(jQuery);\n  } else {\n    console.warn(\"jQuery not found, no hotkeys added :(\");\n  }\n\n}).call(this);\n",
              "type": "blob"
            },
            "pixie": {
              "path": "pixie",
              "content": "module.exports = {\"version\":\"0.9.0\",\"entryPoint\":\"hotkeys\",\"remoteDependencies\":[\"//code.jquery.com/jquery-1.10.1.min.js\",\"http://strd6.github.io/tempest/javascripts/envweb.js\",\"http://strd6.github.io/require/v0.1.0.js\"]};",
              "type": "blob"
            },
            "test/hotkeys": {
              "path": "test/hotkeys",
              "content": "(function() {\n  require(\"../hotkeys\");\n\n  describe(\"hotkeys binding\", function() {\n    return it(\"should bind a hotkey\", function(done) {\n      $(document).bind(\"keydown\", \"a\", function() {\n        return done();\n      });\n      return $(document).trigger($.Event(\"keydown\", {\n        which: 65,\n        keyCode: 65\n      }));\n    });\n  });\n\n}).call(this);\n",
              "type": "blob"
            }
          },
          "entryPoint": "hotkeys",
          "dependencies": {},
          "remoteDependencies": [
            "//code.jquery.com/jquery-1.10.1.min.js",
            "http://strd6.github.io/tempest/javascripts/envweb.js",
            "http://strd6.github.io/require/v0.1.0.js"
          ],
          "repository": {
            "id": 13182272,
            "name": "jquery.hotkeys",
            "full_name": "STRd6/jquery.hotkeys",
            "owner": {
              "login": "STRd6",
              "id": 18894,
              "avatar_url": "https://1.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png",
              "gravatar_id": "33117162fff8a9cf50544a604f60c045",
              "url": "https://api.github.com/users/STRd6",
              "html_url": "https://github.com/STRd6",
              "followers_url": "https://api.github.com/users/STRd6/followers",
              "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
              "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
              "organizations_url": "https://api.github.com/users/STRd6/orgs",
              "repos_url": "https://api.github.com/users/STRd6/repos",
              "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
              "received_events_url": "https://api.github.com/users/STRd6/received_events",
              "type": "User"
            },
            "private": false,
            "html_url": "https://github.com/STRd6/jquery.hotkeys",
            "description": "jQuery hotkeys plugin",
            "fork": false,
            "url": "https://api.github.com/repos/STRd6/jquery.hotkeys",
            "forks_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/forks",
            "keys_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/teams",
            "hooks_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/hooks",
            "issue_events_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/issues/events{/number}",
            "events_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/events",
            "assignees_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/assignees{/user}",
            "branches_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/branches{/branch}",
            "tags_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/tags",
            "blobs_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/languages",
            "stargazers_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/stargazers",
            "contributors_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/contributors",
            "subscribers_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/subscribers",
            "subscription_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/subscription",
            "commits_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/issues/comments/{number}",
            "contents_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/contents/{+path}",
            "compare_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/merges",
            "archive_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/downloads",
            "issues_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/issues{/number}",
            "pulls_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/STRd6/jquery.hotkeys/labels{/name}",
            "created_at": "2013-09-28T22:58:08Z",
            "updated_at": "2013-09-28T22:58:08Z",
            "pushed_at": "2013-09-28T22:58:08Z",
            "git_url": "git://github.com/STRd6/jquery.hotkeys.git",
            "ssh_url": "git@github.com:STRd6/jquery.hotkeys.git",
            "clone_url": "https://github.com/STRd6/jquery.hotkeys.git",
            "svn_url": "https://github.com/STRd6/jquery.hotkeys",
            "homepage": null,
            "size": 0,
            "watchers_count": 0,
            "language": null,
            "has_issues": true,
            "has_downloads": true,
            "has_wiki": true,
            "forks_count": 0,
            "mirror_url": null,
            "open_issues_count": 0,
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "master_branch": "master",
            "default_branch": "master",
            "permissions": {
              "admin": true,
              "push": true,
              "pull": true
            },
            "network_count": 0,
            "branch": "v0.9.0",
            "defaultBranch": "master",
            "includedModules": [
              "Bindable"
            ]
          },
          "progenitor": {
            "url": "http://strd6.github.io/editor/"
          }
        },
        "image-reader": {
          "version": "0.1.3",
          "source": {
            "LICENSE": {
              "path": "LICENSE",
              "mode": "100644",
              "content": "Copyright (c) 2012 Daniel X. Moore\n\nMIT License\n\nPermission is hereby granted, free of charge, to any person obtaining\na copy of this software and associated documentation files (the\n\"Software\"), to deal in the Software without restriction, including\nwithout limitation the rights to use, copy, modify, merge, publish,\ndistribute, sublicense, and/or sell copies of the Software, and to\npermit persons to whom the Software is furnished to do so, subject to\nthe following conditions:\n\nThe above copyright notice and this permission notice shall be\nincluded in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,\nEXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\nMERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND\nNONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE\nLIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION\nOF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION\nWITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.",
              "type": "blob"
            },
            "README.md": {
              "path": "README.md",
              "mode": "100644",
              "content": "# Jquery::ImageReader\n\nHelpful jQuery plugins for dropping and pasting image data.\n\n## Usage\n\n```coffeescript\n$(\"html\").pasteImageReader ({name, dataURL, file, event}) ->\n  $(\"body\").css\n    backgroundImage: \"url(#{dataURL})\"\n\n$(\"html\").dropImageReader ({name, dataURL, file, event}) ->\n  $(\"body\").css\n    backgroundImage: \"url(#{dataURL})\"\n```\n\n## Contributing\n\n1. Fork it\n2. Create your feature branch (`git checkout -b my-new-feature`)\n3. Commit your changes (`git commit -am 'Added some feature'`)\n4. Push to the branch (`git push origin my-new-feature`)\n5. Create new Pull Request\n",
              "type": "blob"
            },
            "test/image_reader.coffee": {
              "path": "test/image_reader.coffee",
              "mode": "100644",
              "content": "require \"../main\"\n\n$(\"html\").pasteImageReader ({name, dataURL, file, event}) ->\n  $(\"body\").css\n    backgroundImage: \"url(#{dataURL})\"\n\n$(\"html\").dropImageReader ({name, dataURL, file, event}) ->\n  $(\"body\").css\n    backgroundImage: \"url(#{dataURL})\"\n",
              "type": "blob"
            },
            "paste.coffee.md": {
              "path": "paste.coffee.md",
              "mode": "100644",
              "content": "Paste\n=====\n\n    (($) ->\n      $.event.fix = ((originalFix) ->\n        (event) ->\n          event = originalFix.apply(this, arguments)\n    \n          if event.type.indexOf('copy') == 0 || event.type.indexOf('paste') == 0\n            event.clipboardData = event.originalEvent.clipboardData\n    \n          return event\n    \n      )($.event.fix)\n    \n      defaults =\n        callback: $.noop\n        matchType: /image.*/\n    \n      $.fn.pasteImageReader = (options) ->\n        if typeof options == \"function\"\n          options =\n            callback: options\n    \n        options = $.extend({}, defaults, options)\n    \n        @each ->\n          element = this\n          $this = $(this)\n    \n          $this.bind 'paste', (event) ->\n            found = false\n            clipboardData = event.clipboardData\n    \n            Array::forEach.call clipboardData.types, (type, i) ->\n              return if found\n    \n              if type.match(options.matchType) or (clipboardData.items && clipboardData.items[i].type.match(options.matchType))\n                file = clipboardData.items[i].getAsFile()\n    \n                reader = new FileReader()\n    \n                reader.onload = (evt) ->\n                  options.callback.call element,\n                    dataURL: evt.target.result\n                    event: evt\n                    file: file\n                    name: file.name\n    \n                reader.readAsDataURL(file)\n    \n                found = true\n    \n    )(jQuery)\n",
              "type": "blob"
            },
            "drop.coffee.md": {
              "path": "drop.coffee.md",
              "mode": "100644",
              "content": "Drop\n====\n\n    (($) ->\n      $.event.fix = ((originalFix) ->\n        (event) ->\n          event = originalFix.apply(this, arguments)\n    \n          if event.type.indexOf('drag') == 0 || event.type.indexOf('drop') == 0\n            event.dataTransfer = event.originalEvent.dataTransfer\n    \n          event\n    \n      )($.event.fix)\n    \n      defaults =\n        callback: $.noop\n        matchType: /image.*/\n    \n      $.fn.dropImageReader = (options) ->\n        if typeof options == \"function\"\n          options =\n            callback: options\n    \n        options = $.extend({}, defaults, options)\n    \n        stopFn = (event) ->\n          event.stopPropagation()\n          event.preventDefault()\n    \n        this.each ->\n          element = this\n          $this = $(this)\n    \n          $this.bind 'dragenter dragover dragleave', stopFn\n    \n          $this.bind 'drop', (event) ->\n            stopFn(event)\n    \n            Array::forEach.call event.dataTransfer.files, (file) ->\n              return unless file.type.match(options.matchType)\n    \n              reader = new FileReader()\n    \n              reader.onload = (evt) ->\n                options.callback.call element,\n                  dataURL: evt.target.result\n                  event: evt\n                  file: file\n                  name: file.name\n    \n              reader.readAsDataURL(file)\n    \n    )(jQuery)\n",
              "type": "blob"
            },
            "main.coffee.md": {
              "path": "main.coffee.md",
              "mode": "100644",
              "content": "\n    require \"./paste\"\n    require \"./drop\"\n",
              "type": "blob"
            },
            "pixie.cson": {
              "path": "pixie.cson",
              "mode": "100644",
              "content": "version: \"0.1.3\"\nentryPoint: \"main\"\nremoteDependencies: [\n  \"//code.jquery.com/jquery-1.10.1.min.js\"\n  \"http://strd6.github.io/require/v0.2.2.js\"\n]\n",
              "type": "blob"
            }
          },
          "distribution": {
            "test/image_reader": {
              "path": "test/image_reader",
              "content": "(function() {\n  require(\"../main\");\n\n  $(\"html\").pasteImageReader(function(_arg) {\n    var dataURL, event, file, name;\n    name = _arg.name, dataURL = _arg.dataURL, file = _arg.file, event = _arg.event;\n    return $(\"body\").css({\n      backgroundImage: \"url(\" + dataURL + \")\"\n    });\n  });\n\n  $(\"html\").dropImageReader(function(_arg) {\n    var dataURL, event, file, name;\n    name = _arg.name, dataURL = _arg.dataURL, file = _arg.file, event = _arg.event;\n    return $(\"body\").css({\n      backgroundImage: \"url(\" + dataURL + \")\"\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/image_reader.coffee",
              "type": "blob"
            },
            "paste": {
              "path": "paste",
              "content": "(function() {\n  (function($) {\n    var defaults;\n    $.event.fix = (function(originalFix) {\n      return function(event) {\n        event = originalFix.apply(this, arguments);\n        if (event.type.indexOf('copy') === 0 || event.type.indexOf('paste') === 0) {\n          event.clipboardData = event.originalEvent.clipboardData;\n        }\n        return event;\n      };\n    })($.event.fix);\n    defaults = {\n      callback: $.noop,\n      matchType: /image.*/\n    };\n    return $.fn.pasteImageReader = function(options) {\n      if (typeof options === \"function\") {\n        options = {\n          callback: options\n        };\n      }\n      options = $.extend({}, defaults, options);\n      return this.each(function() {\n        var $this, element;\n        element = this;\n        $this = $(this);\n        return $this.bind('paste', function(event) {\n          var clipboardData, found;\n          found = false;\n          clipboardData = event.clipboardData;\n          return Array.prototype.forEach.call(clipboardData.types, function(type, i) {\n            var file, reader;\n            if (found) {\n              return;\n            }\n            if (type.match(options.matchType) || (clipboardData.items && clipboardData.items[i].type.match(options.matchType))) {\n              file = clipboardData.items[i].getAsFile();\n              reader = new FileReader();\n              reader.onload = function(evt) {\n                return options.callback.call(element, {\n                  dataURL: evt.target.result,\n                  event: evt,\n                  file: file,\n                  name: file.name\n                });\n              };\n              reader.readAsDataURL(file);\n              return found = true;\n            }\n          });\n        });\n      });\n    };\n  })(jQuery);\n\n}).call(this);\n\n//# sourceURL=paste.coffee",
              "type": "blob"
            },
            "drop": {
              "path": "drop",
              "content": "(function() {\n  (function($) {\n    var defaults;\n    $.event.fix = (function(originalFix) {\n      return function(event) {\n        event = originalFix.apply(this, arguments);\n        if (event.type.indexOf('drag') === 0 || event.type.indexOf('drop') === 0) {\n          event.dataTransfer = event.originalEvent.dataTransfer;\n        }\n        return event;\n      };\n    })($.event.fix);\n    defaults = {\n      callback: $.noop,\n      matchType: /image.*/\n    };\n    return $.fn.dropImageReader = function(options) {\n      var stopFn;\n      if (typeof options === \"function\") {\n        options = {\n          callback: options\n        };\n      }\n      options = $.extend({}, defaults, options);\n      stopFn = function(event) {\n        event.stopPropagation();\n        return event.preventDefault();\n      };\n      return this.each(function() {\n        var $this, element;\n        element = this;\n        $this = $(this);\n        $this.bind('dragenter dragover dragleave', stopFn);\n        return $this.bind('drop', function(event) {\n          stopFn(event);\n          return Array.prototype.forEach.call(event.dataTransfer.files, function(file) {\n            var reader;\n            if (!file.type.match(options.matchType)) {\n              return;\n            }\n            reader = new FileReader();\n            reader.onload = function(evt) {\n              return options.callback.call(element, {\n                dataURL: evt.target.result,\n                event: evt,\n                file: file,\n                name: file.name\n              });\n            };\n            return reader.readAsDataURL(file);\n          });\n        });\n      });\n    };\n  })(jQuery);\n\n}).call(this);\n\n//# sourceURL=drop.coffee",
              "type": "blob"
            },
            "main": {
              "path": "main",
              "content": "(function() {\n  require(\"./paste\");\n\n  require(\"./drop\");\n\n}).call(this);\n\n//# sourceURL=main.coffee",
              "type": "blob"
            },
            "pixie": {
              "path": "pixie",
              "content": "module.exports = {\"version\":\"0.1.3\",\"entryPoint\":\"main\",\"remoteDependencies\":[\"//code.jquery.com/jquery-1.10.1.min.js\",\"http://strd6.github.io/require/v0.2.2.js\"]};",
              "type": "blob"
            }
          },
          "entryPoint": "main",
          "dependencies": {},
          "remoteDependencies": [
            "//code.jquery.com/jquery-1.10.1.min.js",
            "http://strd6.github.io/require/v0.2.2.js"
          ],
          "progenitor": {
            "url": "http://strd6.github.io/editor/"
          },
          "repository": {
            "id": 4527535,
            "name": "jquery-image_reader",
            "full_name": "STRd6/jquery-image_reader",
            "owner": {
              "login": "STRd6",
              "id": 18894,
              "avatar_url": "https://1.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png&r=x",
              "gravatar_id": "33117162fff8a9cf50544a604f60c045",
              "url": "https://api.github.com/users/STRd6",
              "html_url": "https://github.com/STRd6",
              "followers_url": "https://api.github.com/users/STRd6/followers",
              "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
              "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
              "organizations_url": "https://api.github.com/users/STRd6/orgs",
              "repos_url": "https://api.github.com/users/STRd6/repos",
              "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
              "received_events_url": "https://api.github.com/users/STRd6/received_events",
              "type": "User",
              "site_admin": false
            },
            "private": false,
            "html_url": "https://github.com/STRd6/jquery-image_reader",
            "description": "Paste and Drop images into web apps",
            "fork": false,
            "url": "https://api.github.com/repos/STRd6/jquery-image_reader",
            "forks_url": "https://api.github.com/repos/STRd6/jquery-image_reader/forks",
            "keys_url": "https://api.github.com/repos/STRd6/jquery-image_reader/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/STRd6/jquery-image_reader/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/STRd6/jquery-image_reader/teams",
            "hooks_url": "https://api.github.com/repos/STRd6/jquery-image_reader/hooks",
            "issue_events_url": "https://api.github.com/repos/STRd6/jquery-image_reader/issues/events{/number}",
            "events_url": "https://api.github.com/repos/STRd6/jquery-image_reader/events",
            "assignees_url": "https://api.github.com/repos/STRd6/jquery-image_reader/assignees{/user}",
            "branches_url": "https://api.github.com/repos/STRd6/jquery-image_reader/branches{/branch}",
            "tags_url": "https://api.github.com/repos/STRd6/jquery-image_reader/tags",
            "blobs_url": "https://api.github.com/repos/STRd6/jquery-image_reader/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/STRd6/jquery-image_reader/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/STRd6/jquery-image_reader/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/STRd6/jquery-image_reader/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/STRd6/jquery-image_reader/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/STRd6/jquery-image_reader/languages",
            "stargazers_url": "https://api.github.com/repos/STRd6/jquery-image_reader/stargazers",
            "contributors_url": "https://api.github.com/repos/STRd6/jquery-image_reader/contributors",
            "subscribers_url": "https://api.github.com/repos/STRd6/jquery-image_reader/subscribers",
            "subscription_url": "https://api.github.com/repos/STRd6/jquery-image_reader/subscription",
            "commits_url": "https://api.github.com/repos/STRd6/jquery-image_reader/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/STRd6/jquery-image_reader/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/STRd6/jquery-image_reader/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/STRd6/jquery-image_reader/issues/comments/{number}",
            "contents_url": "https://api.github.com/repos/STRd6/jquery-image_reader/contents/{+path}",
            "compare_url": "https://api.github.com/repos/STRd6/jquery-image_reader/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/STRd6/jquery-image_reader/merges",
            "archive_url": "https://api.github.com/repos/STRd6/jquery-image_reader/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/STRd6/jquery-image_reader/downloads",
            "issues_url": "https://api.github.com/repos/STRd6/jquery-image_reader/issues{/number}",
            "pulls_url": "https://api.github.com/repos/STRd6/jquery-image_reader/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/STRd6/jquery-image_reader/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/STRd6/jquery-image_reader/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/STRd6/jquery-image_reader/labels{/name}",
            "created_at": "2012-06-02T07:12:27Z",
            "updated_at": "2013-08-29T08:31:21Z",
            "pushed_at": "2013-04-17T16:28:05Z",
            "git_url": "git://github.com/STRd6/jquery-image_reader.git",
            "ssh_url": "git@github.com:STRd6/jquery-image_reader.git",
            "clone_url": "https://github.com/STRd6/jquery-image_reader.git",
            "svn_url": "https://github.com/STRd6/jquery-image_reader",
            "homepage": null,
            "size": 160,
            "watchers_count": 4,
            "language": "JavaScript",
            "has_issues": true,
            "has_downloads": true,
            "has_wiki": true,
            "forks_count": 1,
            "mirror_url": null,
            "open_issues_count": 0,
            "forks": 1,
            "open_issues": 0,
            "watchers": 4,
            "master_branch": "master",
            "default_branch": "master",
            "permissions": {
              "admin": true,
              "push": true,
              "pull": true
            },
            "network_count": 1,
            "branch": "v0.1.3",
            "defaultBranch": "master"
          }
        }
      },
      "remoteDependencies": [
        "//code.jquery.com/jquery-1.10.1.min.js",
        "http://strd6.github.io/tempest/javascripts/envweb.js",
        "http://strd6.github.io/require/v0.2.2.js"
      ],
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "repository": {
        "id": 13183366,
        "name": "jquery-utils",
        "full_name": "STRd6/jquery-utils",
        "owner": {
          "login": "STRd6",
          "id": 18894,
          "avatar_url": "https://1.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png&r=x",
          "gravatar_id": "33117162fff8a9cf50544a604f60c045",
          "url": "https://api.github.com/users/STRd6",
          "html_url": "https://github.com/STRd6",
          "followers_url": "https://api.github.com/users/STRd6/followers",
          "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
          "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
          "organizations_url": "https://api.github.com/users/STRd6/orgs",
          "repos_url": "https://api.github.com/users/STRd6/repos",
          "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
          "received_events_url": "https://api.github.com/users/STRd6/received_events",
          "type": "User",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/STRd6/jquery-utils",
        "description": "",
        "fork": false,
        "url": "https://api.github.com/repos/STRd6/jquery-utils",
        "forks_url": "https://api.github.com/repos/STRd6/jquery-utils/forks",
        "keys_url": "https://api.github.com/repos/STRd6/jquery-utils/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/STRd6/jquery-utils/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/STRd6/jquery-utils/teams",
        "hooks_url": "https://api.github.com/repos/STRd6/jquery-utils/hooks",
        "issue_events_url": "https://api.github.com/repos/STRd6/jquery-utils/issues/events{/number}",
        "events_url": "https://api.github.com/repos/STRd6/jquery-utils/events",
        "assignees_url": "https://api.github.com/repos/STRd6/jquery-utils/assignees{/user}",
        "branches_url": "https://api.github.com/repos/STRd6/jquery-utils/branches{/branch}",
        "tags_url": "https://api.github.com/repos/STRd6/jquery-utils/tags",
        "blobs_url": "https://api.github.com/repos/STRd6/jquery-utils/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/STRd6/jquery-utils/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/STRd6/jquery-utils/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/STRd6/jquery-utils/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/STRd6/jquery-utils/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/STRd6/jquery-utils/languages",
        "stargazers_url": "https://api.github.com/repos/STRd6/jquery-utils/stargazers",
        "contributors_url": "https://api.github.com/repos/STRd6/jquery-utils/contributors",
        "subscribers_url": "https://api.github.com/repos/STRd6/jquery-utils/subscribers",
        "subscription_url": "https://api.github.com/repos/STRd6/jquery-utils/subscription",
        "commits_url": "https://api.github.com/repos/STRd6/jquery-utils/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/STRd6/jquery-utils/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/STRd6/jquery-utils/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/STRd6/jquery-utils/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/STRd6/jquery-utils/contents/{+path}",
        "compare_url": "https://api.github.com/repos/STRd6/jquery-utils/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/STRd6/jquery-utils/merges",
        "archive_url": "https://api.github.com/repos/STRd6/jquery-utils/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/STRd6/jquery-utils/downloads",
        "issues_url": "https://api.github.com/repos/STRd6/jquery-utils/issues{/number}",
        "pulls_url": "https://api.github.com/repos/STRd6/jquery-utils/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/STRd6/jquery-utils/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/STRd6/jquery-utils/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/STRd6/jquery-utils/labels{/name}",
        "created_at": "2013-09-29T00:25:09Z",
        "updated_at": "2013-10-25T00:40:45Z",
        "pushed_at": "2013-10-25T00:40:42Z",
        "git_url": "git://github.com/STRd6/jquery-utils.git",
        "ssh_url": "git@github.com:STRd6/jquery-utils.git",
        "clone_url": "https://github.com/STRd6/jquery-utils.git",
        "svn_url": "https://github.com/STRd6/jquery-utils",
        "homepage": null,
        "size": 376,
        "watchers_count": 0,
        "language": "CoffeeScript",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "master_branch": "master",
        "default_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "network_count": 0,
        "branch": "v0.1.2",
        "defaultBranch": "master"
      }
    },
    "runtime": {
      "version": "0.1.1",
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "runtime\n=======\n",
          "type": "blob"
        },
        "runtime.coffee.md": {
          "path": "runtime.coffee.md",
          "mode": "100644",
          "content": "The runtime holds utilities to assist with an apps running environment.\n\nIt should me moved into it's own component one day.\n\n    Runtime = (pkg) ->\n\nHold on to a reference to our root node.\n\n      root = null\n\nReturns the node that is the parent of the script element that contains the code\nthat calls this function. If `document.write` has been called before this then the\nresults may not be accurate. Therefore be sure to call currentNode before\nwriting anything to the document.\n\n      currentNode = ->\n        target = document.documentElement\n\n        while (target.childNodes.length and target.lastChild.nodeType == 1)\n          target = target.lastChild\n\n        return target.parentNode\n\nDisplay a promo in the console linking back to the creator of this app.\n\n      promo = ->\n        console.log(\"%c You should meet my creator #{pkg.progenitor.url}\", \"\"\"\n          background: #000;\n          color: white;\n          font-size: 2em;\n          line-height: 2em;\n          padding: 10px 100px;\n          margin-bottom: 1em;\n          text-shadow:\n            0 0 0.05em #fff,\n            0 0 0.1em #fff,\n            0 0 0.15em #fff,\n            0 0 0.2em #ff00de,\n            0 0 0.35em #ff00de,\n            0 0 0.4em #ff00de,\n            0 0 0.5em #ff00de,\n            0 0 0.75em #ff00de;'\n        \"\"\")\n\nCall on start to boot up the runtime, get the root node, add styles, display a\npromo.\n\n      boot: ->\n        root = currentNode()\n\n        promo()\n\n        return root\n\nApply the stylesheet to the root node.\n\n      applyStyleSheet: (style) ->\n        styleNode = document.createElement(\"style\")\n        styleNode.innerHTML = style\n\n        root.appendChild(styleNode)\n\nExport\n\n    module.exports = Runtime\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.1.1\"\nentryPoint: \"runtime\"\nremoteDependencies: [\n  \"http://strd6.github.io/require/v0.2.0.js\"\n]\n",
          "type": "blob"
        },
        "test/runtime.coffee": {
          "path": "test/runtime.coffee",
          "mode": "100644",
          "content": "Runtime = require \"../runtime\"\n\ndescribe \"Runtime\", ->\n  it \"should be created from a package and provide a boot method\", ->\n    assert Runtime(PACKAGE).boot\n",
          "type": "blob"
        }
      },
      "distribution": {
        "runtime": {
          "path": "runtime",
          "content": "(function() {\n  var Runtime;\n\n  Runtime = function(pkg) {\n    var currentNode, promo, root;\n    root = null;\n    currentNode = function() {\n      var target;\n      target = document.documentElement;\n      while (target.childNodes.length && target.lastChild.nodeType === 1) {\n        target = target.lastChild;\n      }\n      return target.parentNode;\n    };\n    promo = function() {\n      return console.log(\"%c You should meet my creator \" + pkg.progenitor.url, \"background: #000;\\ncolor: white;\\nfont-size: 2em;\\nline-height: 2em;\\npadding: 10px 100px;\\nmargin-bottom: 1em;\\ntext-shadow:\\n  0 0 0.05em #fff,\\n  0 0 0.1em #fff,\\n  0 0 0.15em #fff,\\n  0 0 0.2em #ff00de,\\n  0 0 0.35em #ff00de,\\n  0 0 0.4em #ff00de,\\n  0 0 0.5em #ff00de,\\n  0 0 0.75em #ff00de;'\");\n    };\n    return {\n      boot: function() {\n        root = currentNode();\n        promo();\n        return root;\n      },\n      applyStyleSheet: function(style) {\n        var styleNode;\n        styleNode = document.createElement(\"style\");\n        styleNode.innerHTML = style;\n        return root.appendChild(styleNode);\n      }\n    };\n  };\n\n  module.exports = Runtime;\n\n}).call(this);\n",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.1.1\",\"entryPoint\":\"runtime\",\"remoteDependencies\":[\"http://strd6.github.io/require/v0.2.0.js\"]};",
          "type": "blob"
        },
        "test/runtime": {
          "path": "test/runtime",
          "content": "(function() {\n  var Runtime;\n\n  Runtime = require(\"../runtime\");\n\n  describe(\"Runtime\", function() {\n    return it(\"should be created from a package and provide a boot method\", function() {\n      return assert(Runtime(PACKAGE).boot);\n    });\n  });\n\n}).call(this);\n",
          "type": "blob"
        }
      },
      "entryPoint": "runtime",
      "dependencies": {},
      "remoteDependencies": [
        "http://strd6.github.io/require/v0.2.0.js"
      ],
      "repository": {
        "id": 13202878,
        "name": "runtime",
        "full_name": "STRd6/runtime",
        "owner": {
          "login": "STRd6",
          "id": 18894,
          "avatar_url": "https://0.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png",
          "gravatar_id": "33117162fff8a9cf50544a604f60c045",
          "url": "https://api.github.com/users/STRd6",
          "html_url": "https://github.com/STRd6",
          "followers_url": "https://api.github.com/users/STRd6/followers",
          "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
          "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
          "organizations_url": "https://api.github.com/users/STRd6/orgs",
          "repos_url": "https://api.github.com/users/STRd6/repos",
          "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
          "received_events_url": "https://api.github.com/users/STRd6/received_events",
          "type": "User"
        },
        "private": false,
        "html_url": "https://github.com/STRd6/runtime",
        "description": "",
        "fork": false,
        "url": "https://api.github.com/repos/STRd6/runtime",
        "forks_url": "https://api.github.com/repos/STRd6/runtime/forks",
        "keys_url": "https://api.github.com/repos/STRd6/runtime/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/STRd6/runtime/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/STRd6/runtime/teams",
        "hooks_url": "https://api.github.com/repos/STRd6/runtime/hooks",
        "issue_events_url": "https://api.github.com/repos/STRd6/runtime/issues/events{/number}",
        "events_url": "https://api.github.com/repos/STRd6/runtime/events",
        "assignees_url": "https://api.github.com/repos/STRd6/runtime/assignees{/user}",
        "branches_url": "https://api.github.com/repos/STRd6/runtime/branches{/branch}",
        "tags_url": "https://api.github.com/repos/STRd6/runtime/tags",
        "blobs_url": "https://api.github.com/repos/STRd6/runtime/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/STRd6/runtime/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/STRd6/runtime/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/STRd6/runtime/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/STRd6/runtime/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/STRd6/runtime/languages",
        "stargazers_url": "https://api.github.com/repos/STRd6/runtime/stargazers",
        "contributors_url": "https://api.github.com/repos/STRd6/runtime/contributors",
        "subscribers_url": "https://api.github.com/repos/STRd6/runtime/subscribers",
        "subscription_url": "https://api.github.com/repos/STRd6/runtime/subscription",
        "commits_url": "https://api.github.com/repos/STRd6/runtime/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/STRd6/runtime/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/STRd6/runtime/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/STRd6/runtime/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/STRd6/runtime/contents/{+path}",
        "compare_url": "https://api.github.com/repos/STRd6/runtime/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/STRd6/runtime/merges",
        "archive_url": "https://api.github.com/repos/STRd6/runtime/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/STRd6/runtime/downloads",
        "issues_url": "https://api.github.com/repos/STRd6/runtime/issues{/number}",
        "pulls_url": "https://api.github.com/repos/STRd6/runtime/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/STRd6/runtime/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/STRd6/runtime/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/STRd6/runtime/labels{/name}",
        "created_at": "2013-09-30T00:44:37Z",
        "updated_at": "2013-09-30T00:44:37Z",
        "pushed_at": "2013-09-30T00:44:37Z",
        "git_url": "git://github.com/STRd6/runtime.git",
        "ssh_url": "git@github.com:STRd6/runtime.git",
        "clone_url": "https://github.com/STRd6/runtime.git",
        "svn_url": "https://github.com/STRd6/runtime",
        "homepage": null,
        "size": 0,
        "watchers_count": 0,
        "language": null,
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "master_branch": "master",
        "default_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "network_count": 0,
        "branch": "v0.1.1",
        "defaultBranch": "master",
        "includedModules": [
          "Bindable"
        ]
      },
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "name": "runtime"
    },
    "touch-canvas": {
      "version": "0.2.0",
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "touch-canvas\n============\n\nA canvas you can touch\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "entryPoint: \"touch_canvas\"\nversion: \"0.2.0\"\nremoteDependencies: [\n  \"//code.jquery.com/jquery-1.10.1.min.js\"\n  \"http://strd6.github.io/tempest/javascripts/envweb.js\"\n  \"http://strd6.github.io/require/v0.2.2.js\"\n]\ndependencies:\n  \"pixie-canvas\": \"STRd6/pixie-canvas:v0.8.1\"\n",
          "type": "blob"
        },
        "touch_canvas.coffee.md": {
          "path": "touch_canvas.coffee.md",
          "mode": "100644",
          "content": "Touch Canvas\n============\n\nA canvas element that reports mouse and touch events in the range [0, 1].\n\n    PixieCanvas = require \"pixie-canvas\"\n\nA number really close to 1. We should never actually return 1, but move events\nmay get a little fast and loose with exiting the canvas, so let's play it safe.\n\n    MAX = 0.999999999999\n\n    TouchCanvas = (I={}) ->\n      self = PixieCanvas I\n\n      Core(I, self)\n\n      self.include Bindable\n\n      element = self.element()\n\n      # Keep track of if the mouse is active in the element\n      active = false\n\nWhen we click within the canvas set the value for the position we clicked at.\n\n      $(element).on \"mousedown\", (e) ->\n        active = true\n\n        self.trigger \"touch\", localPosition(e)\n\nHandle touch starts\n\n      $(element).on \"touchstart\", (e) ->\n        # Global `event`\n        processTouches event, (touch) ->\n          self.trigger \"touch\", localPosition(touch)\n\nWhen the mouse moves apply a change for each x value in the intervening positions.\n\n      $(element).on \"mousemove\", (e) ->\n        if active\n          self.trigger \"move\", localPosition(e)\n\nHandle moves outside of the element.\n\n      $(document).on \"mousemove\", (e) ->\n        if active\n          self.trigger \"move\", localPosition(e)\n\nHandle touch moves.\n\n      $(element).on \"touchmove\", (e) ->\n        # Global `event`\n        processTouches event, (touch) ->\n          self.trigger \"move\", localPosition(touch)\n\nHandle releases.\n\n      $(element).on \"mouseup\", (e) ->\n        self.trigger \"release\", localPosition(e)\n        active = false\n\n        return\n\nHandle touch ends.\n\n      $(element).on \"touchend\", (e) ->\n        # Global `event`\n        processTouches event, (touch) ->\n          self.trigger \"release\", localPosition(touch)\n\nWhenever the mouse button is released from anywhere, deactivate. Be sure to\ntrigger the release event if the mousedown started within the element.\n\n      $(document).on \"mouseup\", (e) ->\n        if active\n          self.trigger \"release\", localPosition(e)\n\n        active = false\n\n        return\n\nHelpers\n-------\n\nProcess touches\n\n      processTouches = (event, fn) ->\n        event.preventDefault()\n\n        if event.type is \"touchend\"\n          # touchend doesn't have any touches, but does have changed touches\n          touches = event.changedTouches\n        else\n          touches = event.touches\n\n        self.debug? Array::map.call touches, ({identifier, pageX, pageY}) ->\n          \"[#{identifier}: #{pageX}, #{pageY} (#{event.type})]\\n\"\n\n        Array::forEach.call touches, fn\n\nLocal event position.\n\n      localPosition = (e) ->\n        $currentTarget = $(element)\n        offset = $currentTarget.offset()\n\n        width = $currentTarget.width()\n        height = $currentTarget.height()\n\n        point = Point(\n          ((e.pageX - offset.left) / width).clamp(0, MAX)\n          ((e.pageY - offset.top) / height).clamp(0, MAX)\n        )\n\n        # Add mouse into touch identifiers as 0\n        point.identifier = (e.identifier + 1) or 0\n\n        return point\n\nReturn self\n\n      return self\n\nExport\n\n    module.exports = TouchCanvas\n",
          "type": "blob"
        }
      },
      "distribution": {
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"entryPoint\":\"touch_canvas\",\"version\":\"0.2.0\",\"remoteDependencies\":[\"//code.jquery.com/jquery-1.10.1.min.js\",\"http://strd6.github.io/tempest/javascripts/envweb.js\",\"http://strd6.github.io/require/v0.2.2.js\"],\"dependencies\":{\"pixie-canvas\":\"STRd6/pixie-canvas:v0.8.1\"}};",
          "type": "blob"
        },
        "touch_canvas": {
          "path": "touch_canvas",
          "content": "(function() {\n  var MAX, PixieCanvas, TouchCanvas;\n\n  PixieCanvas = require(\"pixie-canvas\");\n\n  MAX = 0.999999999999;\n\n  TouchCanvas = function(I) {\n    var active, element, localPosition, processTouches, self;\n    if (I == null) {\n      I = {};\n    }\n    self = PixieCanvas(I);\n    Core(I, self);\n    self.include(Bindable);\n    element = self.element();\n    active = false;\n    $(element).on(\"mousedown\", function(e) {\n      active = true;\n      return self.trigger(\"touch\", localPosition(e));\n    });\n    $(element).on(\"touchstart\", function(e) {\n      return processTouches(event, function(touch) {\n        return self.trigger(\"touch\", localPosition(touch));\n      });\n    });\n    $(element).on(\"mousemove\", function(e) {\n      if (active) {\n        return self.trigger(\"move\", localPosition(e));\n      }\n    });\n    $(document).on(\"mousemove\", function(e) {\n      if (active) {\n        return self.trigger(\"move\", localPosition(e));\n      }\n    });\n    $(element).on(\"touchmove\", function(e) {\n      return processTouches(event, function(touch) {\n        return self.trigger(\"move\", localPosition(touch));\n      });\n    });\n    $(element).on(\"mouseup\", function(e) {\n      self.trigger(\"release\", localPosition(e));\n      active = false;\n    });\n    $(element).on(\"touchend\", function(e) {\n      return processTouches(event, function(touch) {\n        return self.trigger(\"release\", localPosition(touch));\n      });\n    });\n    $(document).on(\"mouseup\", function(e) {\n      if (active) {\n        self.trigger(\"release\", localPosition(e));\n      }\n      active = false;\n    });\n    processTouches = function(event, fn) {\n      var touches;\n      event.preventDefault();\n      if (event.type === \"touchend\") {\n        touches = event.changedTouches;\n      } else {\n        touches = event.touches;\n      }\n      if (typeof self.debug === \"function\") {\n        self.debug(Array.prototype.map.call(touches, function(_arg) {\n          var identifier, pageX, pageY;\n          identifier = _arg.identifier, pageX = _arg.pageX, pageY = _arg.pageY;\n          return \"[\" + identifier + \": \" + pageX + \", \" + pageY + \" (\" + event.type + \")]\\n\";\n        }));\n      }\n      return Array.prototype.forEach.call(touches, fn);\n    };\n    localPosition = function(e) {\n      var $currentTarget, height, offset, point, width;\n      $currentTarget = $(element);\n      offset = $currentTarget.offset();\n      width = $currentTarget.width();\n      height = $currentTarget.height();\n      point = Point(((e.pageX - offset.left) / width).clamp(0, MAX), ((e.pageY - offset.top) / height).clamp(0, MAX));\n      point.identifier = (e.identifier + 1) || 0;\n      return point;\n    };\n    return self;\n  };\n\n  module.exports = TouchCanvas;\n\n}).call(this);\n\n//# sourceURL=touch_canvas.coffee",
          "type": "blob"
        }
      },
      "entryPoint": "touch_canvas",
      "dependencies": {
        "pixie-canvas": {
          "version": "0.8.1",
          "source": {
            "pixie.cson": {
              "path": "pixie.cson",
              "mode": "100644",
              "content": "entryPoint: \"pixie_canvas\"\nversion: \"0.8.1\"\nremoteDependencies: [\n  \"http://strd6.github.io/require/v0.2.1.js\"\n]\n",
              "type": "blob"
            },
            "pixie_canvas.coffee.md": {
              "path": "pixie_canvas.coffee.md",
              "mode": "100644",
              "content": "Pixie Canvas\n============\n\nPixieCanvas provides a convenient wrapper for working with Context2d.\n\nMethods try to be as flexible as possible as to what arguments they take.\n\nNon-getter methods return `this` for method chaining.\n\n    TAU = 2 * Math.PI\n\n    module.exports = (options={}) ->\n        defaults options,\n          width: 400\n          height: 400\n          init: ->\n\n        canvas = document.createElement \"canvas\"\n        canvas.width = options.width\n        canvas.height = options.height\n\n        context = undefined\n\n        self =\n\n`clear` clears the entire canvas (or a portion of it).\n\nTo clear the entire canvas use `canvas.clear()`\n\n>     #! paint\n>     # Set up: Fill canvas with blue\n>     canvas.fill(\"blue\")\n>\n>     # Clear a portion of the canvas\n>     canvas.clear\n>       x: 50\n>       y: 50\n>       width: 50\n>       height: 50\n\n          clear: ({x, y, width, height}={}) ->\n            x ?= 0\n            y ?= 0\n            width = canvas.width unless width?\n            height = canvas.height unless height?\n\n            context.clearRect(x, y, width, height)\n\n            return this\n\nFills the entire canvas (or a specified section of it) with\nthe given color.\n\n>     #! paint\n>     # Paint the town (entire canvas) red\n>     canvas.fill \"red\"\n>\n>     # Fill a section of the canvas white (#FFF)\n>     canvas.fill\n>       x: 50\n>       y: 50\n>       width: 50\n>       height: 50\n>       color: \"#FFF\"\n\n          fill: (color={}) ->\n            unless (typeof color is \"string\") or color.channels\n              {x, y, width, height, bounds, color} = color\n\n            {x, y, width, height} = bounds if bounds\n\n            x ||= 0\n            y ||= 0\n            width = canvas.width unless width?\n            height = canvas.height unless height?\n\n            @fillColor(color)\n            context.fillRect(x, y, width, height)\n\n            return this\n\nA direct map to the Context2d draw image. `GameObject`s\nthat implement drawable will have this wrapped up nicely,\nso there is a good chance that you will not have to deal with\nit directly.\n\n>     #! paint\n>     $ \"<img>\",\n>       src: \"https://secure.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045\"\n>       load: ->\n>         canvas.drawImage(this, 25, 25)\n\n          drawImage: (args...) ->\n            context.drawImage(args...)\n\n            return this\n\nDraws a circle at the specified position with the specified\nradius and color.\n\n>     #! paint\n>     # Draw a large orange circle\n>     canvas.drawCircle\n>       radius: 30\n>       position: Point(100, 75)\n>       color: \"orange\"\n>\n>     # You may also set a stroke\n>     canvas.drawCircle\n>       x: 25\n>       y: 50\n>       radius: 10\n>       color: \"blue\"\n>       stroke:\n>         color: \"red\"\n>         width: 1\n\nYou can pass in circle objects as well.\n\n>     #! paint\n>     # Create a circle object to set up the next examples\n>     circle =\n>       radius: 20\n>       x: 50\n>       y: 50\n>\n>     # Draw a given circle in yellow\n>     canvas.drawCircle\n>       circle: circle\n>       color: \"yellow\"\n>\n>     # Draw the circle in green at a different position\n>     canvas.drawCircle\n>       circle: circle\n>       position: Point(25, 75)\n>       color: \"green\"\n\nYou may set a stroke, or even pass in only a stroke to draw an unfilled circle.\n\n>     #! paint\n>     # Draw an outline circle in purple.\n>     canvas.drawCircle\n>       x: 50\n>       y: 75\n>       radius: 10\n>       stroke:\n>         color: \"purple\"\n>         width: 2\n>\n\n          drawCircle: ({x, y, radius, position, color, stroke, circle}) ->\n            {x, y, radius} = circle if circle\n            {x, y} = position if position\n\n            radius = 0 if radius < 0\n\n            context.beginPath()\n            context.arc(x, y, radius, 0, TAU, true)\n            context.closePath()\n\n            if color\n              @fillColor(color)\n              context.fill()\n\n            if stroke\n              @strokeColor(stroke.color)\n              @lineWidth(stroke.width)\n              context.stroke()\n\n            return this\n\nDraws a rectangle at the specified position with given\nwidth and height. Optionally takes a position, bounds\nand color argument.\n\n\n          drawRect: ({x, y, width, height, position, bounds, color, stroke}) ->\n            {x, y, width, height} = bounds if bounds\n            {x, y} = position if position\n\n            if color\n              @fillColor(color)\n              context.fillRect(x, y, width, height)\n\n            if stroke\n              @strokeColor(stroke.color)\n              @lineWidth(stroke.width)\n              context.strokeRect(x, y, width, height)\n\n            return @\n\n>     #! paint\n>     # Draw a red rectangle using x, y, width and height\n>     canvas.drawRect\n>       x: 50\n>       y: 50\n>       width: 50\n>       height: 50\n>       color: \"#F00\"\n\n----\n\nYou can mix and match position, witdth and height.\n\n>     #! paint\n>     canvas.drawRect\n>       position: Point(0, 0)\n>       width: 50\n>       height: 50\n>       color: \"blue\"\n>       stroke:\n>         color: \"orange\"\n>         width: 3\n\n----\n\nA bounds can be reused to draw multiple rectangles.\n\n>     #! paint\n>     bounds =\n>       x: 100\n>       y: 0\n>       width: 100\n>       height: 100\n>\n>     # Draw a purple rectangle using bounds\n>     canvas.drawRect\n>       bounds: bounds\n>       color: \"green\"\n>\n>     # Draw the outline of the same bounds, but at a different position\n>     canvas.drawRect\n>       bounds: bounds\n>       position: Point(0, 50)\n>       stroke:\n>         color: \"purple\"\n>         width: 2\n\n----\n\nDraw a line from `start` to `end`.\n\n>     #! paint\n>     # Draw a sweet diagonal\n>     canvas.drawLine\n>       start: Point(0, 0)\n>       end: Point(200, 200)\n>       color: \"purple\"\n>\n>     # Draw another sweet diagonal\n>     canvas.drawLine\n>       start: Point(200, 0)\n>       end: Point(0, 200)\n>       color: \"red\"\n>       width: 6\n>\n>     # Now draw a sweet horizontal with a direction and a length\n>     canvas.drawLine\n>       start: Point(0, 100)\n>       length: 200\n>       direction: Point(1, 0)\n>       color: \"orange\"\n\n          drawLine: ({start, end, width, color, direction, length}) ->\n            width ||= 3\n\n            if direction\n              end = direction.norm(length).add(start)\n\n            @lineWidth(width)\n            @strokeColor(color)\n\n            context.beginPath()\n            context.moveTo(start.x, start.y)\n            context.lineTo(end.x, end.y)\n            context.closePath()\n            context.stroke()\n\n            return this\n\nDraw a polygon.\n\n>     #! paint\n>     # Draw a sweet rhombus\n>     canvas.drawPoly\n>       points: [\n>         Point(50, 25)\n>         Point(75, 50)\n>         Point(50, 75)\n>         Point(25, 50)\n>       ]\n>       color: \"purple\"\n>       stroke:\n>         color: \"red\"\n>         width: 2\n\n          drawPoly: ({points, color, stroke}) ->\n            context.beginPath()\n            points.forEach (point, i) ->\n              if i == 0\n                context.moveTo(point.x, point.y)\n              else\n                context.lineTo(point.x, point.y)\n            context.lineTo points[0].x, points[0].y\n\n            if color\n              @fillColor(color)\n              context.fill()\n\n            if stroke\n              @strokeColor(stroke.color)\n              @lineWidth(stroke.width)\n              context.stroke()\n\n            return @\n\nDraw a rounded rectangle.\n\nAdapted from http://js-bits.blogspot.com/2010/07/canvas-rounded-corner-rectangles.html\n\n>     #! paint\n>     # Draw a purple rounded rectangle with a red outline\n>     canvas.drawRoundRect\n>       position: Point(25, 25)\n>       radius: 10\n>       width: 150\n>       height: 100\n>       color: \"purple\"\n>       stroke:\n>         color: \"red\"\n>         width: 2\n\n          drawRoundRect: ({x, y, width, height, radius, position, bounds, color, stroke}) ->\n            radius = 5 unless radius?\n\n            {x, y, width, height} = bounds if bounds\n            {x, y} = position if position\n\n            context.beginPath()\n            context.moveTo(x + radius, y)\n            context.lineTo(x + width - radius, y)\n            context.quadraticCurveTo(x + width, y, x + width, y + radius)\n            context.lineTo(x + width, y + height - radius)\n            context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)\n            context.lineTo(x + radius, y + height)\n            context.quadraticCurveTo(x, y + height, x, y + height - radius)\n            context.lineTo(x, y + radius)\n            context.quadraticCurveTo(x, y, x + radius, y)\n            context.closePath()\n\n            if color\n              @fillColor(color)\n              context.fill()\n\n            if stroke\n              @lineWidth(stroke.width)\n              @strokeColor(stroke.color)\n              context.stroke()\n\n            return this\n\nDraws text on the canvas at the given position, in the given color.\nIf no color is given then the previous fill color is used.\n\n>     #! paint\n>     # Fill canvas to indicate bounds\n>     canvas.fill\n>       color: '#eee'\n>\n>     # A line to indicate the baseline\n>     canvas.drawLine\n>       start: Point(25, 50)\n>       end: Point(125, 50)\n>       color: \"#333\"\n>       width: 1\n>\n>     # Draw some text, note the position of the baseline\n>     canvas.drawText\n>       position: Point(25, 50)\n>       color: \"red\"\n>       text: \"It's dangerous to go alone\"\n\n\n          drawText: ({x, y, text, position, color, font}) ->\n            {x, y} = position if position\n\n            @fillColor(color)\n            @font(font) if font\n            context.fillText(text, x, y)\n\n            return this\n\nCenters the given text on the canvas at the given y position. An x position\nor point position can also be given in which case the text is centered at the\nx, y or position value specified.\n\n>     #! paint\n>     # Fill canvas to indicate bounds\n>     canvas.fill\n>       color: \"#eee\"\n>\n>     # Center text on the screen at y value 25\n>     canvas.centerText\n>       y: 25\n>       color: \"red\"\n>       text: \"It's dangerous to go alone\"\n>\n>     # Center text at point (75, 75)\n>     canvas.centerText\n>       position: Point(75, 75)\n>       color: \"green\"\n>       text: \"take this\"\n\n          centerText: ({text, x, y, position, color, font}) ->\n            {x, y} = position if position\n\n            x = canvas.width / 2 unless x?\n\n            textWidth = @measureText(text)\n\n            @drawText {\n              text\n              color\n              font\n              x: x - (textWidth) / 2\n              y\n            }\n\nSetting the fill color:\n\n`canvas.fillColor(\"#FF0000\")`\n\nPassing no arguments returns the fillColor:\n\n`canvas.fillColor() # => \"#FF000000\"`\n\nYou can also pass a Color object:\n\n`canvas.fillColor(Color('sky blue'))`\n\n          fillColor: (color) ->\n            if color\n              if color.channels\n                context.fillStyle = color.toString()\n              else\n                context.fillStyle = color\n\n              return @\n            else\n              return context.fillStyle\n\nSetting the stroke color:\n\n`canvas.strokeColor(\"#FF0000\")`\n\nPassing no arguments returns the strokeColor:\n\n`canvas.strokeColor() # => \"#FF0000\"`\n\nYou can also pass a Color object:\n\n`canvas.strokeColor(Color('sky blue'))`\n\n          strokeColor: (color) ->\n            if color\n              if color.channels\n                context.strokeStyle = color.toString()\n              else\n                context.strokeStyle = color\n\n              return this\n            else\n              return context.strokeStyle\n\nDetermine how wide some text is.\n\n`canvas.measureText('Hello World!') # => 55`\n\nIt may have accuracy issues depending on the font used.\n\n          measureText: (text) ->\n            context.measureText(text).width\n\nPasses this canvas to the block with the given matrix transformation\napplied. All drawing methods called within the block will draw\ninto the canvas with the transformation applied. The transformation\nis removed at the end of the block, even if the block throws an error.\n\n          withTransform: (matrix, block) ->\n            context.save()\n\n            context.transform(\n              matrix.a,\n              matrix.b,\n              matrix.c,\n              matrix.d,\n              matrix.tx,\n              matrix.ty\n            )\n\n            try\n              block(this)\n            finally\n              context.restore()\n\n            return this\n\nStraight proxy to context `putImageData` method.\n\n          putImageData: (args...) ->\n            context.putImageData(args...)\n\n            return this\n\nContext getter.\n\n          context: ->\n            context\n\nGetter for the actual html canvas element.\n\n          element: ->\n            canvas\n\nStraight proxy to context pattern creation.\n\n          createPattern: (image, repitition) ->\n            context.createPattern(image, repitition)\n\nSet a clip rectangle.\n\n          clip: (x, y, width, height) ->\n            context.beginPath()\n            context.rect(x, y, width, height)\n            context.clip()\n\n            return this\n\nGenerate accessors that get properties from the context object.\n\n        contextAttrAccessor = (attrs...) ->\n          attrs.forEach (attr) ->\n            self[attr] = (newVal) ->\n              if newVal?\n                context[attr] = newVal\n                return @\n              else\n                context[attr]\n\n        contextAttrAccessor(\n          \"font\",\n          \"globalAlpha\",\n          \"globalCompositeOperation\",\n          \"lineWidth\",\n          \"textAlign\",\n        )\n\nGenerate accessors that get properties from the canvas object.\n\n        canvasAttrAccessor = (attrs...) ->\n          attrs.forEach (attr) ->\n            self[attr] = (newVal) ->\n              if newVal?\n                canvas[attr] = newVal\n                return @\n              else\n                canvas[attr]\n\n        canvasAttrAccessor(\n          \"height\",\n          \"width\",\n        )\n\n        context = canvas.getContext('2d')\n\n        options.init(self)\n\n        return self\n\nDepend on either jQuery or Zepto for now (TODO: Don't depend on either)\n\nHelpers\n-------\n\nFill in default properties for an object, setting them only if they are not\nalready present.\n\n    defaults = (target, objects...) ->\n      for object in objects\n        for name of object\n          unless target.hasOwnProperty(name)\n            target[name] = object[name]\n\n      return target\n\nInteractive Examples\n--------------------\n\n>     #! setup\n>     Canvas = require \"/pixie_canvas\"\n>\n>     window.Point ?= (x, y) ->\n>       x: x\n>       y: y\n>\n>     Interactive.register \"paint\", ({source, runtimeElement}) ->\n>       canvas = Canvas\n>         width: 400\n>         height: 200\n>\n>       code = CoffeeScript.compile(source)\n>\n>       runtimeElement.empty().append canvas.element()\n>       Function(\"canvas\", code)(canvas)\n",
              "type": "blob"
            },
            "test/test.coffee": {
              "path": "test/test.coffee",
              "mode": "100644",
              "content": "Canvas = require \"../pixie_canvas\"\n\ndescribe \"pixie canvas\", ->\n  it \"Should create a canvas\", ->\n    canvas = Canvas\n      width: 400\n      height: 150\n\n    assert canvas\n    \n    assert canvas.width() is 400\n",
              "type": "blob"
            }
          },
          "distribution": {
            "pixie": {
              "path": "pixie",
              "content": "module.exports = {\"entryPoint\":\"pixie_canvas\",\"version\":\"0.8.1\",\"remoteDependencies\":[\"http://strd6.github.io/require/v0.2.1.js\"]};",
              "type": "blob"
            },
            "pixie_canvas": {
              "path": "pixie_canvas",
              "content": "(function() {\n  var TAU, defaults,\n    __slice = [].slice;\n\n  TAU = 2 * Math.PI;\n\n  module.exports = function(options) {\n    var canvas, canvasAttrAccessor, context, contextAttrAccessor, self;\n    if (options == null) {\n      options = {};\n    }\n    defaults(options, {\n      width: 400,\n      height: 400,\n      init: function() {}\n    });\n    canvas = document.createElement(\"canvas\");\n    canvas.width = options.width;\n    canvas.height = options.height;\n    context = void 0;\n    self = {\n      clear: function(_arg) {\n        var height, width, x, y, _ref;\n        _ref = _arg != null ? _arg : {}, x = _ref.x, y = _ref.y, width = _ref.width, height = _ref.height;\n        if (x == null) {\n          x = 0;\n        }\n        if (y == null) {\n          y = 0;\n        }\n        if (width == null) {\n          width = canvas.width;\n        }\n        if (height == null) {\n          height = canvas.height;\n        }\n        context.clearRect(x, y, width, height);\n        return this;\n      },\n      fill: function(color) {\n        var bounds, height, width, x, y, _ref;\n        if (color == null) {\n          color = {};\n        }\n        if (!((typeof color === \"string\") || color.channels)) {\n          _ref = color, x = _ref.x, y = _ref.y, width = _ref.width, height = _ref.height, bounds = _ref.bounds, color = _ref.color;\n        }\n        if (bounds) {\n          x = bounds.x, y = bounds.y, width = bounds.width, height = bounds.height;\n        }\n        x || (x = 0);\n        y || (y = 0);\n        if (width == null) {\n          width = canvas.width;\n        }\n        if (height == null) {\n          height = canvas.height;\n        }\n        this.fillColor(color);\n        context.fillRect(x, y, width, height);\n        return this;\n      },\n      drawImage: function() {\n        var args;\n        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        context.drawImage.apply(context, args);\n        return this;\n      },\n      drawCircle: function(_arg) {\n        var circle, color, position, radius, stroke, x, y;\n        x = _arg.x, y = _arg.y, radius = _arg.radius, position = _arg.position, color = _arg.color, stroke = _arg.stroke, circle = _arg.circle;\n        if (circle) {\n          x = circle.x, y = circle.y, radius = circle.radius;\n        }\n        if (position) {\n          x = position.x, y = position.y;\n        }\n        if (radius < 0) {\n          radius = 0;\n        }\n        context.beginPath();\n        context.arc(x, y, radius, 0, TAU, true);\n        context.closePath();\n        if (color) {\n          this.fillColor(color);\n          context.fill();\n        }\n        if (stroke) {\n          this.strokeColor(stroke.color);\n          this.lineWidth(stroke.width);\n          context.stroke();\n        }\n        return this;\n      },\n      drawRect: function(_arg) {\n        var bounds, color, height, position, stroke, width, x, y;\n        x = _arg.x, y = _arg.y, width = _arg.width, height = _arg.height, position = _arg.position, bounds = _arg.bounds, color = _arg.color, stroke = _arg.stroke;\n        if (bounds) {\n          x = bounds.x, y = bounds.y, width = bounds.width, height = bounds.height;\n        }\n        if (position) {\n          x = position.x, y = position.y;\n        }\n        if (color) {\n          this.fillColor(color);\n          context.fillRect(x, y, width, height);\n        }\n        if (stroke) {\n          this.strokeColor(stroke.color);\n          this.lineWidth(stroke.width);\n          context.strokeRect(x, y, width, height);\n        }\n        return this;\n      },\n      drawLine: function(_arg) {\n        var color, direction, end, length, start, width;\n        start = _arg.start, end = _arg.end, width = _arg.width, color = _arg.color, direction = _arg.direction, length = _arg.length;\n        width || (width = 3);\n        if (direction) {\n          end = direction.norm(length).add(start);\n        }\n        this.lineWidth(width);\n        this.strokeColor(color);\n        context.beginPath();\n        context.moveTo(start.x, start.y);\n        context.lineTo(end.x, end.y);\n        context.closePath();\n        context.stroke();\n        return this;\n      },\n      drawPoly: function(_arg) {\n        var color, points, stroke;\n        points = _arg.points, color = _arg.color, stroke = _arg.stroke;\n        context.beginPath();\n        points.forEach(function(point, i) {\n          if (i === 0) {\n            return context.moveTo(point.x, point.y);\n          } else {\n            return context.lineTo(point.x, point.y);\n          }\n        });\n        context.lineTo(points[0].x, points[0].y);\n        if (color) {\n          this.fillColor(color);\n          context.fill();\n        }\n        if (stroke) {\n          this.strokeColor(stroke.color);\n          this.lineWidth(stroke.width);\n          context.stroke();\n        }\n        return this;\n      },\n      drawRoundRect: function(_arg) {\n        var bounds, color, height, position, radius, stroke, width, x, y;\n        x = _arg.x, y = _arg.y, width = _arg.width, height = _arg.height, radius = _arg.radius, position = _arg.position, bounds = _arg.bounds, color = _arg.color, stroke = _arg.stroke;\n        if (radius == null) {\n          radius = 5;\n        }\n        if (bounds) {\n          x = bounds.x, y = bounds.y, width = bounds.width, height = bounds.height;\n        }\n        if (position) {\n          x = position.x, y = position.y;\n        }\n        context.beginPath();\n        context.moveTo(x + radius, y);\n        context.lineTo(x + width - radius, y);\n        context.quadraticCurveTo(x + width, y, x + width, y + radius);\n        context.lineTo(x + width, y + height - radius);\n        context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);\n        context.lineTo(x + radius, y + height);\n        context.quadraticCurveTo(x, y + height, x, y + height - radius);\n        context.lineTo(x, y + radius);\n        context.quadraticCurveTo(x, y, x + radius, y);\n        context.closePath();\n        if (color) {\n          this.fillColor(color);\n          context.fill();\n        }\n        if (stroke) {\n          this.lineWidth(stroke.width);\n          this.strokeColor(stroke.color);\n          context.stroke();\n        }\n        return this;\n      },\n      drawText: function(_arg) {\n        var color, font, position, text, x, y;\n        x = _arg.x, y = _arg.y, text = _arg.text, position = _arg.position, color = _arg.color, font = _arg.font;\n        if (position) {\n          x = position.x, y = position.y;\n        }\n        this.fillColor(color);\n        if (font) {\n          this.font(font);\n        }\n        context.fillText(text, x, y);\n        return this;\n      },\n      centerText: function(_arg) {\n        var color, font, position, text, textWidth, x, y;\n        text = _arg.text, x = _arg.x, y = _arg.y, position = _arg.position, color = _arg.color, font = _arg.font;\n        if (position) {\n          x = position.x, y = position.y;\n        }\n        if (x == null) {\n          x = canvas.width / 2;\n        }\n        textWidth = this.measureText(text);\n        return this.drawText({\n          text: text,\n          color: color,\n          font: font,\n          x: x - textWidth / 2,\n          y: y\n        });\n      },\n      fillColor: function(color) {\n        if (color) {\n          if (color.channels) {\n            context.fillStyle = color.toString();\n          } else {\n            context.fillStyle = color;\n          }\n          return this;\n        } else {\n          return context.fillStyle;\n        }\n      },\n      strokeColor: function(color) {\n        if (color) {\n          if (color.channels) {\n            context.strokeStyle = color.toString();\n          } else {\n            context.strokeStyle = color;\n          }\n          return this;\n        } else {\n          return context.strokeStyle;\n        }\n      },\n      measureText: function(text) {\n        return context.measureText(text).width;\n      },\n      withTransform: function(matrix, block) {\n        context.save();\n        context.transform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);\n        try {\n          block(this);\n        } finally {\n          context.restore();\n        }\n        return this;\n      },\n      putImageData: function() {\n        var args;\n        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        context.putImageData.apply(context, args);\n        return this;\n      },\n      context: function() {\n        return context;\n      },\n      element: function() {\n        return canvas;\n      },\n      createPattern: function(image, repitition) {\n        return context.createPattern(image, repitition);\n      },\n      clip: function(x, y, width, height) {\n        context.beginPath();\n        context.rect(x, y, width, height);\n        context.clip();\n        return this;\n      }\n    };\n    contextAttrAccessor = function() {\n      var attrs;\n      attrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      return attrs.forEach(function(attr) {\n        return self[attr] = function(newVal) {\n          if (newVal != null) {\n            context[attr] = newVal;\n            return this;\n          } else {\n            return context[attr];\n          }\n        };\n      });\n    };\n    contextAttrAccessor(\"font\", \"globalAlpha\", \"globalCompositeOperation\", \"lineWidth\", \"textAlign\");\n    canvasAttrAccessor = function() {\n      var attrs;\n      attrs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      return attrs.forEach(function(attr) {\n        return self[attr] = function(newVal) {\n          if (newVal != null) {\n            canvas[attr] = newVal;\n            return this;\n          } else {\n            return canvas[attr];\n          }\n        };\n      });\n    };\n    canvasAttrAccessor(\"height\", \"width\");\n    context = canvas.getContext('2d');\n    options.init(self);\n    return self;\n  };\n\n  defaults = function() {\n    var name, object, objects, target, _i, _len;\n    target = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n    for (_i = 0, _len = objects.length; _i < _len; _i++) {\n      object = objects[_i];\n      for (name in object) {\n        if (!target.hasOwnProperty(name)) {\n          target[name] = object[name];\n        }\n      }\n    }\n    return target;\n  };\n\n}).call(this);\n",
              "type": "blob"
            },
            "test/test": {
              "path": "test/test",
              "content": "(function() {\n  var Canvas;\n\n  Canvas = require(\"../pixie_canvas\");\n\n  describe(\"pixie canvas\", function() {\n    return it(\"Should create a canvas\", function() {\n      var canvas;\n      canvas = Canvas({\n        width: 400,\n        height: 150\n      });\n      assert(canvas);\n      return assert(canvas.width() === 400);\n    });\n  });\n\n}).call(this);\n",
              "type": "blob"
            }
          },
          "entryPoint": "pixie_canvas",
          "dependencies": {},
          "remoteDependencies": [
            "http://strd6.github.io/require/v0.2.1.js"
          ],
          "repository": {
            "id": 12096899,
            "name": "pixie-canvas",
            "full_name": "STRd6/pixie-canvas",
            "owner": {
              "login": "STRd6",
              "id": 18894,
              "avatar_url": "https://1.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png",
              "gravatar_id": "33117162fff8a9cf50544a604f60c045",
              "url": "https://api.github.com/users/STRd6",
              "html_url": "https://github.com/STRd6",
              "followers_url": "https://api.github.com/users/STRd6/followers",
              "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
              "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
              "organizations_url": "https://api.github.com/users/STRd6/orgs",
              "repos_url": "https://api.github.com/users/STRd6/repos",
              "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
              "received_events_url": "https://api.github.com/users/STRd6/received_events",
              "type": "User"
            },
            "private": false,
            "html_url": "https://github.com/STRd6/pixie-canvas",
            "description": "A pretty ok HTML5 canvas wrapper",
            "fork": false,
            "url": "https://api.github.com/repos/STRd6/pixie-canvas",
            "forks_url": "https://api.github.com/repos/STRd6/pixie-canvas/forks",
            "keys_url": "https://api.github.com/repos/STRd6/pixie-canvas/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/STRd6/pixie-canvas/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/STRd6/pixie-canvas/teams",
            "hooks_url": "https://api.github.com/repos/STRd6/pixie-canvas/hooks",
            "issue_events_url": "https://api.github.com/repos/STRd6/pixie-canvas/issues/events{/number}",
            "events_url": "https://api.github.com/repos/STRd6/pixie-canvas/events",
            "assignees_url": "https://api.github.com/repos/STRd6/pixie-canvas/assignees{/user}",
            "branches_url": "https://api.github.com/repos/STRd6/pixie-canvas/branches{/branch}",
            "tags_url": "https://api.github.com/repos/STRd6/pixie-canvas/tags",
            "blobs_url": "https://api.github.com/repos/STRd6/pixie-canvas/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/STRd6/pixie-canvas/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/STRd6/pixie-canvas/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/STRd6/pixie-canvas/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/STRd6/pixie-canvas/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/STRd6/pixie-canvas/languages",
            "stargazers_url": "https://api.github.com/repos/STRd6/pixie-canvas/stargazers",
            "contributors_url": "https://api.github.com/repos/STRd6/pixie-canvas/contributors",
            "subscribers_url": "https://api.github.com/repos/STRd6/pixie-canvas/subscribers",
            "subscription_url": "https://api.github.com/repos/STRd6/pixie-canvas/subscription",
            "commits_url": "https://api.github.com/repos/STRd6/pixie-canvas/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/STRd6/pixie-canvas/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/STRd6/pixie-canvas/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/STRd6/pixie-canvas/issues/comments/{number}",
            "contents_url": "https://api.github.com/repos/STRd6/pixie-canvas/contents/{+path}",
            "compare_url": "https://api.github.com/repos/STRd6/pixie-canvas/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/STRd6/pixie-canvas/merges",
            "archive_url": "https://api.github.com/repos/STRd6/pixie-canvas/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/STRd6/pixie-canvas/downloads",
            "issues_url": "https://api.github.com/repos/STRd6/pixie-canvas/issues{/number}",
            "pulls_url": "https://api.github.com/repos/STRd6/pixie-canvas/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/STRd6/pixie-canvas/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/STRd6/pixie-canvas/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/STRd6/pixie-canvas/labels{/name}",
            "created_at": "2013-08-14T01:15:34Z",
            "updated_at": "2013-10-01T17:16:30Z",
            "pushed_at": "2013-10-01T17:16:30Z",
            "git_url": "git://github.com/STRd6/pixie-canvas.git",
            "ssh_url": "git@github.com:STRd6/pixie-canvas.git",
            "clone_url": "https://github.com/STRd6/pixie-canvas.git",
            "svn_url": "https://github.com/STRd6/pixie-canvas",
            "homepage": null,
            "size": 1520,
            "watchers_count": 0,
            "language": "CoffeeScript",
            "has_issues": true,
            "has_downloads": true,
            "has_wiki": true,
            "forks_count": 0,
            "mirror_url": null,
            "open_issues_count": 2,
            "forks": 0,
            "open_issues": 2,
            "watchers": 0,
            "master_branch": "master",
            "default_branch": "master",
            "permissions": {
              "admin": true,
              "push": true,
              "pull": true
            },
            "network_count": 0,
            "branch": "v0.8.1",
            "defaultBranch": "master",
            "includedModules": [
              "Bindable"
            ]
          },
          "progenitor": {
            "url": "http://strd6.github.io/editor/"
          }
        }
      },
      "remoteDependencies": [
        "//code.jquery.com/jquery-1.10.1.min.js",
        "http://strd6.github.io/tempest/javascripts/envweb.js",
        "http://strd6.github.io/require/v0.2.2.js"
      ],
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "repository": {
        "id": 13783983,
        "name": "touch-canvas",
        "full_name": "STRd6/touch-canvas",
        "owner": {
          "login": "STRd6",
          "id": 18894,
          "avatar_url": "https://1.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png&r=x",
          "gravatar_id": "33117162fff8a9cf50544a604f60c045",
          "url": "https://api.github.com/users/STRd6",
          "html_url": "https://github.com/STRd6",
          "followers_url": "https://api.github.com/users/STRd6/followers",
          "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
          "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
          "organizations_url": "https://api.github.com/users/STRd6/orgs",
          "repos_url": "https://api.github.com/users/STRd6/repos",
          "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
          "received_events_url": "https://api.github.com/users/STRd6/received_events",
          "type": "User",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/STRd6/touch-canvas",
        "description": "A canvas you can touch",
        "fork": false,
        "url": "https://api.github.com/repos/STRd6/touch-canvas",
        "forks_url": "https://api.github.com/repos/STRd6/touch-canvas/forks",
        "keys_url": "https://api.github.com/repos/STRd6/touch-canvas/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/STRd6/touch-canvas/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/STRd6/touch-canvas/teams",
        "hooks_url": "https://api.github.com/repos/STRd6/touch-canvas/hooks",
        "issue_events_url": "https://api.github.com/repos/STRd6/touch-canvas/issues/events{/number}",
        "events_url": "https://api.github.com/repos/STRd6/touch-canvas/events",
        "assignees_url": "https://api.github.com/repos/STRd6/touch-canvas/assignees{/user}",
        "branches_url": "https://api.github.com/repos/STRd6/touch-canvas/branches{/branch}",
        "tags_url": "https://api.github.com/repos/STRd6/touch-canvas/tags",
        "blobs_url": "https://api.github.com/repos/STRd6/touch-canvas/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/STRd6/touch-canvas/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/STRd6/touch-canvas/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/STRd6/touch-canvas/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/STRd6/touch-canvas/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/STRd6/touch-canvas/languages",
        "stargazers_url": "https://api.github.com/repos/STRd6/touch-canvas/stargazers",
        "contributors_url": "https://api.github.com/repos/STRd6/touch-canvas/contributors",
        "subscribers_url": "https://api.github.com/repos/STRd6/touch-canvas/subscribers",
        "subscription_url": "https://api.github.com/repos/STRd6/touch-canvas/subscription",
        "commits_url": "https://api.github.com/repos/STRd6/touch-canvas/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/STRd6/touch-canvas/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/STRd6/touch-canvas/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/STRd6/touch-canvas/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/STRd6/touch-canvas/contents/{+path}",
        "compare_url": "https://api.github.com/repos/STRd6/touch-canvas/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/STRd6/touch-canvas/merges",
        "archive_url": "https://api.github.com/repos/STRd6/touch-canvas/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/STRd6/touch-canvas/downloads",
        "issues_url": "https://api.github.com/repos/STRd6/touch-canvas/issues{/number}",
        "pulls_url": "https://api.github.com/repos/STRd6/touch-canvas/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/STRd6/touch-canvas/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/STRd6/touch-canvas/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/STRd6/touch-canvas/labels{/name}",
        "created_at": "2013-10-22T19:46:48Z",
        "updated_at": "2013-10-27T19:12:55Z",
        "pushed_at": "2013-10-27T19:12:55Z",
        "git_url": "git://github.com/STRd6/touch-canvas.git",
        "ssh_url": "git@github.com:STRd6/touch-canvas.git",
        "clone_url": "https://github.com/STRd6/touch-canvas.git",
        "svn_url": "https://github.com/STRd6/touch-canvas",
        "homepage": null,
        "size": 948,
        "watchers_count": 0,
        "language": "CoffeeScript",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "master_branch": "master",
        "default_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "network_count": 0,
        "branch": "v0.2.0",
        "defaultBranch": "master"
      }
    },
    "commando": {
      "version": "0.9.0",
      "source": {
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "",
          "type": "blob"
        },
        "main.coffee.md": {
          "path": "main.coffee.md",
          "mode": "100644",
          "content": "Command Stack\n=============\n\nA simple stack based implementation of executable and undoable commands.\n\n    CommandStack = ->\n      stack = []\n      index = 0\n\n      execute: (command) ->\n        stack[index] = command\n        command.execute()\n\n        # Be sure to blast obsolete redos\n        stack.length = index += 1\n\n      undo: ->\n        if @canUndo()\n          index -= 1\n\n          command = stack[index]\n          command.undo()\n\n          return command\n\n      redo: ->\n        if @canRedo()\n          command = stack[index]\n          command.execute()\n\n          index += 1\n\n          return command\n\n      current: ->\n        stack[index-1]\n\n      canUndo: ->\n        index > 0\n\n      canRedo: ->\n        stack[index]?\n\n    module.exports = CommandStack\n",
          "type": "blob"
        },
        "package.json": {
          "path": "package.json",
          "mode": "100644",
          "content": "{\n  \"name\": \"commando\",\n  \"version\": \"0.9.0\",\n  \"description\": \"Simple Command Pattern\",\n  \"devDependencies\": {\n    \"coffee-script\": \"~1.6.3\",\n    \"mocha\": \"~1.12.0\",\n    \"uglify-js\": \"~2.3.6\"\n  },\n  \"repository\": {\n    \"type\": \"git\",\n    \"url\": \"https://github.com/STRd6/commando.git\"\n  },\n  \"files\": [\n    \"dist\"\n  ],\n  \"main\": \"dist/commando.js\"\n}\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.9.0\"\nremoteDependencies: [\n  \"http://strd6.github.io/require/v0.2.2.js\"\n]\n",
          "type": "blob"
        },
        "test/command_stack.coffee": {
          "path": "test/command_stack.coffee",
          "mode": "100644",
          "content": "CommandStack = require \"../main\"\n\nok = assert\nequals = assert.equal\n\ndescribe \"CommandStack\", ->\n  it \"undo on an empty stack returns undefined\", ->\n    commandStack = CommandStack()\n  \n    equals commandStack.undo(), undefined\n  \n  it \"redo on an empty stack returns undefined\", ->\n    commandStack = CommandStack()\n  \n    equals commandStack.redo(), undefined\n  \n  it \"executes commands\", ->\n    command =\n      execute: ->\n        ok true, \"command executed\"\n  \n    commandStack = CommandStack()\n  \n    commandStack.execute command\n  \n  it \"can undo\", ->\n    command =\n      execute: ->\n      undo: ->\n        ok true, \"command executed\"\n  \n    commandStack = CommandStack()\n    commandStack.execute command\n  \n    commandStack.undo()\n  \n  it \"can redo\", ->\n    command =\n      execute: ->\n        ok true, \"command executed\"\n      undo: ->\n  \n    commandStack = CommandStack()\n    commandStack.execute command\n  \n    commandStack.undo()\n    commandStack.redo()\n  \n  it \"executes redone command once on redo\", ->\n    command =\n      execute: ->\n        ok true, \"command executed\"\n      undo: ->\n  \n    commandStack = CommandStack()\n    commandStack.execute command\n  \n    commandStack.undo()\n    commandStack.redo()\n  \n    equals commandStack.redo(), undefined\n    equals commandStack.redo(), undefined\n  \n  it \"command is returned when undone\", ->\n    command =\n      execute: ->\n      undo: ->\n  \n    commandStack = CommandStack()\n    commandStack.execute command\n  \n    equals commandStack.undo(), command, \"Undone command is returned\"\n  \n  it \"command is returned when redone\", ->\n    command =\n      execute: ->\n      undo: ->\n  \n    commandStack = CommandStack()\n    commandStack.execute command\n    commandStack.undo()\n  \n    equals commandStack.redo(), command, \"Redone command is returned\"\n  \n  it \"cannot redo an obsolete future\", ->\n    Command = ->\n      execute: ->\n      undo: ->\n  \n    commandStack = CommandStack()\n    commandStack.execute Command()\n    commandStack.execute Command()\n  \n    commandStack.undo()\n    commandStack.undo()\n  \n    equals commandStack.canRedo(), true\n  \n    commandStack.execute Command()\n  \n    equals commandStack.canRedo(), false\n",
          "type": "blob"
        }
      },
      "distribution": {
        "main": {
          "path": "main",
          "content": "(function() {\n  var CommandStack;\n\n  CommandStack = function() {\n    var index, stack;\n    stack = [];\n    index = 0;\n    return {\n      execute: function(command) {\n        stack[index] = command;\n        command.execute();\n        return stack.length = index += 1;\n      },\n      undo: function() {\n        var command;\n        if (this.canUndo()) {\n          index -= 1;\n          command = stack[index];\n          command.undo();\n          return command;\n        }\n      },\n      redo: function() {\n        var command;\n        if (this.canRedo()) {\n          command = stack[index];\n          command.execute();\n          index += 1;\n          return command;\n        }\n      },\n      current: function() {\n        return stack[index - 1];\n      },\n      canUndo: function() {\n        return index > 0;\n      },\n      canRedo: function() {\n        return stack[index] != null;\n      }\n    };\n  };\n\n  module.exports = CommandStack;\n\n}).call(this);\n\n//# sourceURL=main.coffee",
          "type": "blob"
        },
        "package": {
          "path": "package",
          "content": "module.exports = {\"name\":\"commando\",\"version\":\"0.9.0\",\"description\":\"Simple Command Pattern\",\"devDependencies\":{\"coffee-script\":\"~1.6.3\",\"mocha\":\"~1.12.0\",\"uglify-js\":\"~2.3.6\"},\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/STRd6/commando.git\"},\"files\":[\"dist\"],\"main\":\"dist/commando.js\"};",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.9.0\",\"remoteDependencies\":[\"http://strd6.github.io/require/v0.2.2.js\"]};",
          "type": "blob"
        },
        "test/command_stack": {
          "path": "test/command_stack",
          "content": "(function() {\n  var CommandStack, equals, ok;\n\n  CommandStack = require(\"../main\");\n\n  ok = assert;\n\n  equals = assert.equal;\n\n  describe(\"CommandStack\", function() {\n    it(\"undo on an empty stack returns undefined\", function() {\n      var commandStack;\n      commandStack = CommandStack();\n      return equals(commandStack.undo(), void 0);\n    });\n    it(\"redo on an empty stack returns undefined\", function() {\n      var commandStack;\n      commandStack = CommandStack();\n      return equals(commandStack.redo(), void 0);\n    });\n    it(\"executes commands\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {\n          return ok(true, \"command executed\");\n        }\n      };\n      commandStack = CommandStack();\n      return commandStack.execute(command);\n    });\n    it(\"can undo\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {},\n        undo: function() {\n          return ok(true, \"command executed\");\n        }\n      };\n      commandStack = CommandStack();\n      commandStack.execute(command);\n      return commandStack.undo();\n    });\n    it(\"can redo\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {\n          return ok(true, \"command executed\");\n        },\n        undo: function() {}\n      };\n      commandStack = CommandStack();\n      commandStack.execute(command);\n      commandStack.undo();\n      return commandStack.redo();\n    });\n    it(\"executes redone command once on redo\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {\n          return ok(true, \"command executed\");\n        },\n        undo: function() {}\n      };\n      commandStack = CommandStack();\n      commandStack.execute(command);\n      commandStack.undo();\n      commandStack.redo();\n      equals(commandStack.redo(), void 0);\n      return equals(commandStack.redo(), void 0);\n    });\n    it(\"command is returned when undone\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {},\n        undo: function() {}\n      };\n      commandStack = CommandStack();\n      commandStack.execute(command);\n      return equals(commandStack.undo(), command, \"Undone command is returned\");\n    });\n    it(\"command is returned when redone\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {},\n        undo: function() {}\n      };\n      commandStack = CommandStack();\n      commandStack.execute(command);\n      commandStack.undo();\n      return equals(commandStack.redo(), command, \"Redone command is returned\");\n    });\n    return it(\"cannot redo an obsolete future\", function() {\n      var Command, commandStack;\n      Command = function() {\n        return {\n          execute: function() {},\n          undo: function() {}\n        };\n      };\n      commandStack = CommandStack();\n      commandStack.execute(Command());\n      commandStack.execute(Command());\n      commandStack.undo();\n      commandStack.undo();\n      equals(commandStack.canRedo(), true);\n      commandStack.execute(Command());\n      return equals(commandStack.canRedo(), false);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/command_stack.coffee",
          "type": "blob"
        }
      },
      "entryPoint": "main",
      "dependencies": {},
      "remoteDependencies": [
        "http://strd6.github.io/require/v0.2.2.js"
      ],
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "repository": {
        "id": 11981428,
        "name": "commando",
        "full_name": "STRd6/commando",
        "owner": {
          "login": "STRd6",
          "id": 18894,
          "avatar_url": "https://2.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png&r=x",
          "gravatar_id": "33117162fff8a9cf50544a604f60c045",
          "url": "https://api.github.com/users/STRd6",
          "html_url": "https://github.com/STRd6",
          "followers_url": "https://api.github.com/users/STRd6/followers",
          "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
          "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
          "organizations_url": "https://api.github.com/users/STRd6/orgs",
          "repos_url": "https://api.github.com/users/STRd6/repos",
          "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
          "received_events_url": "https://api.github.com/users/STRd6/received_events",
          "type": "User",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/STRd6/commando",
        "description": "A simple JS command pattern.",
        "fork": false,
        "url": "https://api.github.com/repos/STRd6/commando",
        "forks_url": "https://api.github.com/repos/STRd6/commando/forks",
        "keys_url": "https://api.github.com/repos/STRd6/commando/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/STRd6/commando/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/STRd6/commando/teams",
        "hooks_url": "https://api.github.com/repos/STRd6/commando/hooks",
        "issue_events_url": "https://api.github.com/repos/STRd6/commando/issues/events{/number}",
        "events_url": "https://api.github.com/repos/STRd6/commando/events",
        "assignees_url": "https://api.github.com/repos/STRd6/commando/assignees{/user}",
        "branches_url": "https://api.github.com/repos/STRd6/commando/branches{/branch}",
        "tags_url": "https://api.github.com/repos/STRd6/commando/tags",
        "blobs_url": "https://api.github.com/repos/STRd6/commando/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/STRd6/commando/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/STRd6/commando/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/STRd6/commando/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/STRd6/commando/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/STRd6/commando/languages",
        "stargazers_url": "https://api.github.com/repos/STRd6/commando/stargazers",
        "contributors_url": "https://api.github.com/repos/STRd6/commando/contributors",
        "subscribers_url": "https://api.github.com/repos/STRd6/commando/subscribers",
        "subscription_url": "https://api.github.com/repos/STRd6/commando/subscription",
        "commits_url": "https://api.github.com/repos/STRd6/commando/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/STRd6/commando/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/STRd6/commando/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/STRd6/commando/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/STRd6/commando/contents/{+path}",
        "compare_url": "https://api.github.com/repos/STRd6/commando/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/STRd6/commando/merges",
        "archive_url": "https://api.github.com/repos/STRd6/commando/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/STRd6/commando/downloads",
        "issues_url": "https://api.github.com/repos/STRd6/commando/issues{/number}",
        "pulls_url": "https://api.github.com/repos/STRd6/commando/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/STRd6/commando/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/STRd6/commando/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/STRd6/commando/labels{/name}",
        "created_at": "2013-08-08T16:51:40Z",
        "updated_at": "2013-09-29T21:08:02Z",
        "pushed_at": "2013-09-29T21:08:02Z",
        "git_url": "git://github.com/STRd6/commando.git",
        "ssh_url": "git@github.com:STRd6/commando.git",
        "clone_url": "https://github.com/STRd6/commando.git",
        "svn_url": "https://github.com/STRd6/commando",
        "homepage": null,
        "size": 192,
        "watchers_count": 0,
        "language": "CoffeeScript",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "master_branch": "master",
        "default_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "network_count": 0,
        "branch": "v0.9.0",
        "defaultBranch": "master"
      }
    },
    "grid-gen": {
      "version": "0.1.0",
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "grid-gen\n========\n\nGenerate a grid image programatically.\n",
          "type": "blob"
        },
        "grid.coffee.md": {
          "path": "grid.coffee.md",
          "mode": "100644",
          "content": "Grid Generator\n==============\n\n    Grid = ({width, height, guide, color}={}) ->\n      color ?= \"rgba(0, 0, 0, 0.3)\"\n      height ?= 32\n      width ?= 32\n      guide ?= 4\n\n      canvasWidth = width * guide\n      canvasHeight = height * guide\n\n      canvas = document.createElement(\"canvas\")\n      canvas.width = canvasWidth\n      canvas.height = canvasHeight\n\n      context = canvas.getContext(\"2d\")\n\n      context.fillStyle = color\n\n      [0...guide].forEach (i) ->\n        context.fillRect(i * width, 0, 1, canvasHeight)\n        context.fillRect(0, i * height, canvasWidth, 1)\n    \n      # Draw the strong line\n      context.fillRect(0, 0, 1, canvasHeight)\n      context.fillRect(0, 0, canvasWidth, 1)\n    \n      backgroundImage: ->\n        \"url(#{this.toDataURL()})\"\n    \n      toDataURL: ->\n        canvas.toDataURL(\"image/png\")\n\n    module.exports = Grid\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.1.0\"\nentryPoint: \"grid\"\nremoteDependencies: [\n  \"http://strd6.github.io/require/v0.2.2.js\"\n]\n",
          "type": "blob"
        },
        "test/test.coffee": {
          "path": "test/test.coffee",
          "mode": "100644",
          "content": "Grid = require \"../grid\"\n\ndocument.body.style[\"background-image\"] = Grid().backgroundImage()\n",
          "type": "blob"
        }
      },
      "distribution": {
        "grid": {
          "path": "grid",
          "content": "(function() {\n  var Grid;\n\n  Grid = function(_arg) {\n    var canvas, canvasHeight, canvasWidth, color, context, guide, height, width, _i, _ref, _results;\n    _ref = _arg != null ? _arg : {}, width = _ref.width, height = _ref.height, guide = _ref.guide, color = _ref.color;\n    if (color == null) {\n      color = \"rgba(0, 0, 0, 0.3)\";\n    }\n    if (height == null) {\n      height = 32;\n    }\n    if (width == null) {\n      width = 32;\n    }\n    if (guide == null) {\n      guide = 4;\n    }\n    canvasWidth = width * guide;\n    canvasHeight = height * guide;\n    canvas = document.createElement(\"canvas\");\n    canvas.width = canvasWidth;\n    canvas.height = canvasHeight;\n    context = canvas.getContext(\"2d\");\n    context.fillStyle = color;\n    (function() {\n      _results = [];\n      for (var _i = 0; 0 <= guide ? _i < guide : _i > guide; 0 <= guide ? _i++ : _i--){ _results.push(_i); }\n      return _results;\n    }).apply(this).forEach(function(i) {\n      context.fillRect(i * width, 0, 1, canvasHeight);\n      return context.fillRect(0, i * height, canvasWidth, 1);\n    });\n    context.fillRect(0, 0, 1, canvasHeight);\n    context.fillRect(0, 0, canvasWidth, 1);\n    return {\n      backgroundImage: function() {\n        return \"url(\" + (this.toDataURL()) + \")\";\n      },\n      toDataURL: function() {\n        return canvas.toDataURL(\"image/png\");\n      }\n    };\n  };\n\n  module.exports = Grid;\n\n}).call(this);\n\n//# sourceURL=grid.coffee",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.1.0\",\"entryPoint\":\"grid\",\"remoteDependencies\":[\"http://strd6.github.io/require/v0.2.2.js\"]};",
          "type": "blob"
        },
        "test/test": {
          "path": "test/test",
          "content": "(function() {\n  var Grid;\n\n  Grid = require(\"../grid\");\n\n  document.body.style[\"background-image\"] = Grid().backgroundImage();\n\n}).call(this);\n\n//# sourceURL=test/test.coffee",
          "type": "blob"
        }
      },
      "entryPoint": "grid",
      "dependencies": {},
      "remoteDependencies": [
        "http://strd6.github.io/require/v0.2.2.js"
      ],
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "repository": {
        "id": 13941148,
        "name": "grid-gen",
        "full_name": "STRd6/grid-gen",
        "owner": {
          "login": "STRd6",
          "id": 18894,
          "avatar_url": "https://2.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png&r=x",
          "gravatar_id": "33117162fff8a9cf50544a604f60c045",
          "url": "https://api.github.com/users/STRd6",
          "html_url": "https://github.com/STRd6",
          "followers_url": "https://api.github.com/users/STRd6/followers",
          "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
          "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
          "organizations_url": "https://api.github.com/users/STRd6/orgs",
          "repos_url": "https://api.github.com/users/STRd6/repos",
          "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
          "received_events_url": "https://api.github.com/users/STRd6/received_events",
          "type": "User",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/STRd6/grid-gen",
        "description": "Generate a grid image programatically.",
        "fork": false,
        "url": "https://api.github.com/repos/STRd6/grid-gen",
        "forks_url": "https://api.github.com/repos/STRd6/grid-gen/forks",
        "keys_url": "https://api.github.com/repos/STRd6/grid-gen/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/STRd6/grid-gen/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/STRd6/grid-gen/teams",
        "hooks_url": "https://api.github.com/repos/STRd6/grid-gen/hooks",
        "issue_events_url": "https://api.github.com/repos/STRd6/grid-gen/issues/events{/number}",
        "events_url": "https://api.github.com/repos/STRd6/grid-gen/events",
        "assignees_url": "https://api.github.com/repos/STRd6/grid-gen/assignees{/user}",
        "branches_url": "https://api.github.com/repos/STRd6/grid-gen/branches{/branch}",
        "tags_url": "https://api.github.com/repos/STRd6/grid-gen/tags",
        "blobs_url": "https://api.github.com/repos/STRd6/grid-gen/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/STRd6/grid-gen/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/STRd6/grid-gen/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/STRd6/grid-gen/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/STRd6/grid-gen/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/STRd6/grid-gen/languages",
        "stargazers_url": "https://api.github.com/repos/STRd6/grid-gen/stargazers",
        "contributors_url": "https://api.github.com/repos/STRd6/grid-gen/contributors",
        "subscribers_url": "https://api.github.com/repos/STRd6/grid-gen/subscribers",
        "subscription_url": "https://api.github.com/repos/STRd6/grid-gen/subscription",
        "commits_url": "https://api.github.com/repos/STRd6/grid-gen/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/STRd6/grid-gen/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/STRd6/grid-gen/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/STRd6/grid-gen/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/STRd6/grid-gen/contents/{+path}",
        "compare_url": "https://api.github.com/repos/STRd6/grid-gen/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/STRd6/grid-gen/merges",
        "archive_url": "https://api.github.com/repos/STRd6/grid-gen/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/STRd6/grid-gen/downloads",
        "issues_url": "https://api.github.com/repos/STRd6/grid-gen/issues{/number}",
        "pulls_url": "https://api.github.com/repos/STRd6/grid-gen/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/STRd6/grid-gen/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/STRd6/grid-gen/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/STRd6/grid-gen/labels{/name}",
        "releases_url": "https://api.github.com/repos/STRd6/grid-gen/releases{/id}",
        "created_at": "2013-10-28T23:06:21Z",
        "updated_at": "2013-10-28T23:06:22Z",
        "pushed_at": "2013-10-28T23:06:22Z",
        "git_url": "git://github.com/STRd6/grid-gen.git",
        "ssh_url": "git@github.com:STRd6/grid-gen.git",
        "clone_url": "https://github.com/STRd6/grid-gen.git",
        "svn_url": "https://github.com/STRd6/grid-gen",
        "homepage": null,
        "size": 0,
        "watchers_count": 0,
        "language": null,
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "master_branch": "master",
        "default_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "network_count": 0,
        "branch": "v0.1.0",
        "defaultBranch": "master"
      }
    }
  },
  "remoteDependencies": [
    "//code.jquery.com/jquery-1.10.1.min.js",
    "//cdnjs.cloudflare.com/ajax/libs/coffee-script/1.6.3/coffee-script.min.js",
    "http://strd6.github.io/tempest/javascripts/envweb-v0.4.6.js",
    "http://strd6.github.io/require/v0.2.2.js?"
  ],
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "repository": {
    "id": 13182952,
    "name": "pixel-editor",
    "full_name": "STRd6/pixel-editor",
    "owner": {
      "login": "STRd6",
      "id": 18894,
      "avatar_url": "https://0.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png&r=x",
      "gravatar_id": "33117162fff8a9cf50544a604f60c045",
      "url": "https://api.github.com/users/STRd6",
      "html_url": "https://github.com/STRd6",
      "followers_url": "https://api.github.com/users/STRd6/followers",
      "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
      "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
      "organizations_url": "https://api.github.com/users/STRd6/orgs",
      "repos_url": "https://api.github.com/users/STRd6/repos",
      "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
      "received_events_url": "https://api.github.com/users/STRd6/received_events",
      "type": "User",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/STRd6/pixel-editor",
    "description": "It edits pixels",
    "fork": false,
    "url": "https://api.github.com/repos/STRd6/pixel-editor",
    "forks_url": "https://api.github.com/repos/STRd6/pixel-editor/forks",
    "keys_url": "https://api.github.com/repos/STRd6/pixel-editor/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/STRd6/pixel-editor/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/STRd6/pixel-editor/teams",
    "hooks_url": "https://api.github.com/repos/STRd6/pixel-editor/hooks",
    "issue_events_url": "https://api.github.com/repos/STRd6/pixel-editor/issues/events{/number}",
    "events_url": "https://api.github.com/repos/STRd6/pixel-editor/events",
    "assignees_url": "https://api.github.com/repos/STRd6/pixel-editor/assignees{/user}",
    "branches_url": "https://api.github.com/repos/STRd6/pixel-editor/branches{/branch}",
    "tags_url": "https://api.github.com/repos/STRd6/pixel-editor/tags",
    "blobs_url": "https://api.github.com/repos/STRd6/pixel-editor/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/STRd6/pixel-editor/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/STRd6/pixel-editor/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/STRd6/pixel-editor/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/STRd6/pixel-editor/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/STRd6/pixel-editor/languages",
    "stargazers_url": "https://api.github.com/repos/STRd6/pixel-editor/stargazers",
    "contributors_url": "https://api.github.com/repos/STRd6/pixel-editor/contributors",
    "subscribers_url": "https://api.github.com/repos/STRd6/pixel-editor/subscribers",
    "subscription_url": "https://api.github.com/repos/STRd6/pixel-editor/subscription",
    "commits_url": "https://api.github.com/repos/STRd6/pixel-editor/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/STRd6/pixel-editor/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/STRd6/pixel-editor/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/STRd6/pixel-editor/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/STRd6/pixel-editor/contents/{+path}",
    "compare_url": "https://api.github.com/repos/STRd6/pixel-editor/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/STRd6/pixel-editor/merges",
    "archive_url": "https://api.github.com/repos/STRd6/pixel-editor/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/STRd6/pixel-editor/downloads",
    "issues_url": "https://api.github.com/repos/STRd6/pixel-editor/issues{/number}",
    "pulls_url": "https://api.github.com/repos/STRd6/pixel-editor/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/STRd6/pixel-editor/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/STRd6/pixel-editor/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/STRd6/pixel-editor/labels{/name}",
    "releases_url": "https://api.github.com/repos/STRd6/pixel-editor/releases{/id}",
    "created_at": "2013-09-28T23:51:14Z",
    "updated_at": "2013-11-20T16:18:52Z",
    "pushed_at": "2013-11-19T22:12:03Z",
    "git_url": "git://github.com/STRd6/pixel-editor.git",
    "ssh_url": "git@github.com:STRd6/pixel-editor.git",
    "clone_url": "https://github.com/STRd6/pixel-editor.git",
    "svn_url": "https://github.com/STRd6/pixel-editor",
    "homepage": null,
    "size": 861,
    "stargazers_count": 2,
    "watchers_count": 2,
    "language": "CoffeeScript",
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 1,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 1,
    "open_issues": 0,
    "watchers": 2,
    "default_branch": "master",
    "master_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "network_count": 1,
    "subscribers_count": 2,
    "branch": "layer-actions",
    "defaultBranch": "master"
  }
});