wall=2;
overlap=0.01;
module switchhole(){
    
    plateThickness=wall+overlap*2;
    lkey=19.05;
    holesize=14;
    width=15;
    height=5;
    mountingholeradius=2;
    cutoutheight = 3;
    cutoutwidth = 1;
    holediff=lkey-holesize;
    w=width*lkey;
    h=height*lkey;

	translate([-holesize/2,-holesize/2,-overlap]) union(){
		cube([holesize,holesize,plateThickness]);

		translate([-cutoutwidth,1,0])
		cube([holesize+2*cutoutwidth,cutoutheight,plateThickness]);

		translate([-cutoutwidth,holesize-cutoutwidth-cutoutheight,0])
		cube([holesize+2*cutoutwidth,cutoutheight,plateThickness]);
	}
}

module baseshape(size) {
    rotate([0,0,60]) hull() {
        for (a=[0:2]) {
            rotate([0,0,a*(360/3)]) translate([-size,0]) circle(0.1);
        }
    }
}

module shell() {
    difference() {
        
        hull () {
            linear_extrude(.1) baseshape(40);
            translate([0,0,80])
            linear_extrude(.1) baseshape(20);
        }
            
        hull () {
            linear_extrude(.1) baseshape(40-wall);
            translate([0,0,80+0.1])
            linear_extrude(.1) baseshape(20-wall);
        }
    }
}
module topCube(cubesize) {
    
    
    translate([0,0,68]) 
    rotate([0,-35,0])
    rotate([45,0,0])
    cube([cubesize,cubesize,cubesize]);
}

module switchplate() {
    intersection() {
        translate([0,0,30]) union() {
            difference() {
                translate([0,0,wall/2]) cube([80,80,wall], center=true);
                switchhole();
            }
            cube([24,24,30], center=true);
        }
        hull () {
            linear_extrude(.1) baseshape(40);
            translate([0,0,80])
            linear_extrude(.1) baseshape(20);
        }
    }
}

//shell();
//topCube(50);
switchplate();