# Movable Type (r) (C) 2001-2014 Six Apart, Ltd. All Rights Reserved.
# This code cannot be redistributed without permission from www.sixapart.com.
# For more information, consult your Movable Type license.
#
# $Id$
package MT::DataAPI::Endpoint::Role::v2;

use strict;
use warnings;

use MT::DataAPI::Endpoint::Common;
use MT::DataAPI::Resource;

sub list {
    my ( $app, $endpoint ) = @_;

    my $res = filtered_list( $app, $endpoint, 'role' ) or return;

    +{  totalResults => $res->{count} + 0,
        items =>
            MT::DataAPI::Resource::Type::ObjectList->new( $res->{objects} ),
    };
}

sub create {
    my ( $app, $endpoint ) = @_;

    my $orig_role = $app->model('role')->new;

    my $new_role = $app->resource_object( 'role', $orig_role )
        or return;

    if ( defined $new_role->name ) {
        my $name = $new_role->name;
        $name =~ s/(^\s+|\s+$)//g;
        $new_role->name($name);
    }

    save_object(
        $app, 'role',
        $new_role,
        $orig_role,
        sub {
            if ( my $author = $app->user ) {
                $new_role->created_by( $author->id );
            }
            $_[0]->();
        }
    ) or return;

    $new_role;
}

sub update {
    my ( $app, $endpoint ) = @_;

    my ($orig_role) = context_objects(@_)
        or return;
    my $new_role = $app->resource_object( 'role', $orig_role )
        or return;

    save_object(
        $app, 'role',
        $new_role,
        $orig_role,
        sub {
            if ( my $author = $app->user ) {
                $new_role->modified_by( $author->id );
            }
            $_[0]->();
        }
    ) or return;

    $new_role;
}

1;

__END__

=head1 NAME

MT::DataAPI::Endpoint::Role - Movable Type class for endpoint definitions about the MT::Role.

=head1 AUTHOR & COPYRIGHT

Please see the I<MT> manpage for author, copyright, and license information.

=cut
